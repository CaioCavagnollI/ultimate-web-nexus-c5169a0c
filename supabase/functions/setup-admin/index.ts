import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const adminEmail = "admin@nexus.altas221177";
    const adminPassword = "admin2211777_";

    // Check if admin already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingAdmin = existingUsers?.users?.find((u) => u.email === adminEmail);

    let adminUserId: string;

    if (existingAdmin) {
      adminUserId = existingAdmin.id;
      // Update password
      await supabase.auth.admin.updateUserById(adminUserId, {
        password: adminPassword,
        email_confirm: true,
      });
    } else {
      // Create admin user
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: { full_name: "Admin Nexus" },
      });
      if (createError) throw createError;
      adminUserId = newUser.user.id;
    }

    // Ensure profile exists with lifetime plan
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", adminUserId)
      .maybeSingle();

    if (!profile) {
      await supabase.from("profiles").insert({
        user_id: adminUserId,
        display_name: "Admin Nexus",
        plan: "lifetime",
      });
    } else {
      await supabase.from("profiles").update({ plan: "lifetime" }).eq("user_id", adminUserId);
    }

    // Ensure admin role
    const { data: existingRole } = await supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", adminUserId)
      .eq("role", "admin")
      .maybeSingle();

    if (!existingRole) {
      await supabase.from("user_roles").insert({
        user_id: adminUserId,
        role: "admin",
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Admin configurado com sucesso", userId: adminUserId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
