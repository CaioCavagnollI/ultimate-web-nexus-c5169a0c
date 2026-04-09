import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const log = (step: string, details?: unknown) =>
  console.log(`[EXECUTION-ROUTER] ${step}${details ? ` - ${JSON.stringify(details)}` : ""}`);

// ── Policy Engine ──────────────────────────────────────────────
type PolicyDecision = "allow" | "deny" | "degrade" | "require_manual_review";

interface PolicyResult {
  decision: PolicyDecision;
  reason: string | null;
}

function evaluatePolicy(input: {
  role: string;
  entitled: boolean;
  clientOwned: boolean;
  engineKey: string;
}): PolicyResult {
  if (!input.entitled) return { decision: "deny", reason: "billing_blocked" };
  if (!["professional", "admin"].includes(input.role) && input.engineKey !== "atlas-chat") {
    return { decision: "deny", reason: "forbidden_role" };
  }
  if (!input.clientOwned && input.role !== "admin" && input.engineKey !== "atlas-chat") {
    return { decision: "deny", reason: "client_not_owned" };
  }
  return { decision: "allow", reason: null };
}

// ── Execution Mode Router ──────────────────────────────────────
function routeMode(engineKey: string, requestedMode?: string): "sync" | "async" {
  if (requestedMode === "async" || requestedMode === "sync") return requestedMode;
  if (["scanner", "atlas-research", "prescription-generate"].includes(engineKey)) return "async";
  return "sync";
}

// ── Entitlement Check ──────────────────────────────────────────
async function checkEntitlement(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  engineKey: string
): Promise<boolean> {
  // Admin always entitled
  const { data: roles } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);

  if (roles?.some((r: { role: string }) => r.role === "admin")) return true;

  // Check entitlement_grants
  const { data: grants } = await supabase
    .from("entitlement_grants")
    .select("code, active, ends_at")
    .eq("user_id", userId)
    .eq("active", true);

  if (grants?.some((g: { code: string; ends_at: string | null }) => {
    if (g.code === engineKey || g.code === "all") {
      if (!g.ends_at) return true;
      return new Date(g.ends_at) > new Date();
    }
    return false;
  })) return true;

  // Check profile plan tier for basic entitlements
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("user_id", userId)
    .single();

  const plan = profile?.plan || "free";
  const freeEngines = ["atlas-chat"];
  const proEngines = ["atlas-mentor", "atlas-explain", "atlas-prescription", "scanner", "prescription-generate"];
  const premiumEngines = ["atlas-research", "atlas-analyzer", "atlas-editorial"];

  if (freeEngines.includes(engineKey)) return true;
  if (proEngines.includes(engineKey) && ["pro", "premium"].includes(plan)) return true;
  if (premiumEngines.includes(engineKey) && plan === "premium") return true;

  return false;
}

// ── Client Ownership Check ─────────────────────────────────────
async function checkClientOwnership(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  clientId: string | null
): Promise<boolean> {
  if (!clientId) return true;
  const { data } = await supabase
    .from("clients")
    .select("id")
    .eq("id", clientId)
    .eq("user_id", userId)
    .single();
  return !!data;
}

// ── Main Handler ───────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  const correlationId = req.headers.get("x-correlation-id") || requestId;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    // Auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData.user) throw new Error("Authentication failed");

    const user = userData.user;
    const userId = user.id;

    const body = await req.json();
    const { engine_key, mode: requestedMode, client_id, prescription_id, input: engineInput } = body;

    if (!engine_key) throw new Error("engine_key is required");

    log("Request received", { requestId, correlationId, engineKey: engine_key, userId });

    // Get user role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    const userRole = roles?.[0]?.role || "user";

    // Entitlement check
    const entitled = await checkEntitlement(supabase, userId, engine_key);

    // Client ownership check
    const clientOwned = await checkClientOwnership(supabase, userId, client_id);

    // Policy evaluation
    const policyResult = evaluatePolicy({
      role: userRole,
      entitled,
      clientOwned,
      engineKey: engine_key,
    });

    log("Policy evaluated", { requestId, decision: policyResult.decision, reason: policyResult.reason });

    // Route execution mode
    const executionMode = routeMode(engine_key, requestedMode);

    // Get active engine version
    const { data: engineReg } = await supabase
      .from("engine_registry")
      .select("version")
      .eq("engine_key", engine_key)
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const engineVersion = engineReg?.version || "1.0.0";

    // Create execution record
    const { data: execution, error: execError } = await supabase
      .from("executions")
      .insert({
        actor_id: userId,
        client_id: client_id || null,
        prescription_id: prescription_id || null,
        engine_key,
        engine_version: engineVersion,
        mode: executionMode,
        status: policyResult.decision === "allow" ? "running" : "blocked",
        policy_result: policyResult.decision,
        billing_result: entitled ? "entitled" : "blocked",
        request_id: requestId,
        correlation_id: correlationId,
        input: engineInput || {},
        started_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (execError) {
      log("Failed to create execution record", { error: execError.message });
    }

    const executionId = execution?.id;

    // Log policy event
    if (executionId) {
      await supabase.from("execution_events").insert({
        execution_id: executionId,
        level: "info",
        event_name: "policy_evaluated",
        payload: { decision: policyResult.decision, reason: policyResult.reason },
      });
    }

    // If blocked, record violation and return
    if (policyResult.decision !== "allow") {
      await supabase.from("policy_violations").insert({
        actor_id: userId,
        client_id: client_id || null,
        execution_id: executionId || null,
        policy_name: "execution_gate",
        decision: policyResult.decision,
        reason: policyResult.reason,
        payload: { engine_key, requestId },
      });

      if (executionId) {
        await supabase.from("executions").update({
          status: "blocked",
          finished_at: new Date().toISOString(),
          error_code: "POLICY_BLOCKED",
          error_message: policyResult.reason,
        }).eq("id", executionId);
      }

      return new Response(JSON.stringify({
        ok: false,
        status: "blocked",
        request_id: requestId,
        correlation_id: correlationId,
        policy: policyResult,
        upgrade_required: !entitled,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json", "x-request-id": requestId, "x-correlation-id": correlationId },
        status: 403,
      });
    }

    // ── Execute Engine (sync placeholder — real engines delegate to specific functions) ──
    let engineOutput: Record<string, unknown> = {};
    let executionStatus: string = "success";
    let usedFallback = false;

    try {
      // For now, the execution router delegates to the appropriate edge function
      // In production, this would call the specific engine
      engineOutput = {
        engine_key,
        engine_version: engineVersion,
        mode: executionMode,
        message: `Engine ${engine_key} executed successfully`,
        timestamp: new Date().toISOString(),
      };

      if (executionId) {
        await supabase.from("execution_events").insert({
          execution_id: executionId,
          level: "info",
          event_name: "engine_completed",
          payload: { engine_key, engine_version: engineVersion },
        });
      }
    } catch (engineError) {
      // Fallback
      log("Primary engine failed, using fallback", { requestId, error: String(engineError) });
      usedFallback = true;
      executionStatus = "fallback_success";

      engineOutput = {
        engine_key,
        fallback: true,
        source: "fallback-safe-engine",
        message: "Fallback engine provided safe output",
      };

      if (executionId) {
        await supabase.from("execution_events").insert({
          execution_id: executionId,
          level: "warn",
          event_name: "fallback_activated",
          payload: { reason: String(engineError) },
        });

        await supabase.from("executions").update({
          fallback_engine_key: "fallback-safe",
          fallback_engine_version: "1.0.0",
        }).eq("id", executionId);
      }
    }

    // Update execution record
    if (executionId) {
      await supabase.from("executions").update({
        status: executionStatus,
        output: engineOutput,
        finished_at: new Date().toISOString(),
      }).eq("id", executionId);
    }

    log("Execution completed", { requestId, status: executionStatus, fallback: usedFallback });

    return new Response(JSON.stringify({
      ok: true,
      status: executionStatus,
      request_id: requestId,
      correlation_id: correlationId,
      mode: executionMode,
      engine_version: engineVersion,
      fallback: usedFallback,
      data: engineOutput,
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "x-request-id": requestId,
        "x-correlation-id": correlationId,
      },
      status: 200,
    });

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    log("ERROR", { requestId, message: msg });

    return new Response(JSON.stringify({
      ok: false,
      error: msg,
      request_id: requestId,
      correlation_id: correlationId,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "x-request-id": requestId, "x-correlation-id": correlationId },
      status: error instanceof Error && error.message.includes("Authentication") ? 401 : 500,
    });
  }
});
