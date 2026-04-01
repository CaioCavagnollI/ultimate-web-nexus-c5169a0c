import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type TrainingSession = Tables<"training_sessions">;
export type SessionSet = Tables<"session_sets">;

export function useTrainingSessions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["training_sessions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("training_sessions").select("*, clients(name)").order("date", { ascending: false });
      if (error) throw error;
      return data.map((s) => ({ ...s, client_name: s.clients?.name }));
    },
    enabled: !!user,
  });
}

export function useCreateSession() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: Omit<TablesInsert<"training_sessions">, "user_id">) => {
      const { data, error } = await supabase.from("training_sessions").insert({ ...input, user_id: user!.id }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["training_sessions"] }); toast.success("Sessão criada"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useCompleteSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, duration_minutes }: { id: string; duration_minutes?: number }) => {
      const { error } = await supabase.from("training_sessions").update({ status: "completed", duration_minutes }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["training_sessions"] }); toast.success("Sessão concluída"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useSessionSets(sessionId: string | undefined) {
  return useQuery({
    queryKey: ["session_sets", sessionId],
    queryFn: async () => {
      const { data, error } = await supabase.from("session_sets").select("*").eq("session_id", sessionId!).order("exercise_name").order("set_number");
      if (error) throw error;
      return data;
    },
    enabled: !!sessionId,
  });
}

export function useAddSet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: TablesInsert<"session_sets">) => {
      const { data, error } = await supabase.from("session_sets").insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: ["session_sets", v.session_id] }); },
    onError: (e: Error) => toast.error(e.message),
  });
}
