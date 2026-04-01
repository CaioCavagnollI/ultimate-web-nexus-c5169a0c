import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface TrainingSession {
  id: string;
  user_id: string;
  client_id: string | null;
  prescription_id: string | null;
  date: string;
  status: "in_progress" | "completed" | "cancelled";
  duration_minutes: number | null;
  notes: string | null;
  created_at: string;
}

export interface SessionSet {
  id: string;
  session_id: string;
  exercise_name: string;
  set_number: number;
  reps: number | null;
  load_kg: number | null;
  rpe: number | null;
  rir: number | null;
  completed: boolean;
}

export function useTrainingSessions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["training_sessions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("training_sessions" as any).select("*, clients(name)").order("date", { ascending: false });
      if (error) throw error;
      return (data as any[]).map((s) => ({ ...s, client_name: s.clients?.name })) as (TrainingSession & { client_name?: string })[];
    },
    enabled: !!user,
  });
}

export function useCreateSession() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: Partial<TrainingSession>) => {
      const { data, error } = await supabase.from("training_sessions" as any).insert({ ...input, user_id: user!.id } as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["training_sessions"] }); toast.success("Sessão criada"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useCompleteSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, duration_minutes }: { id: string; duration_minutes?: number }) => {
      const { error } = await supabase.from("training_sessions" as any).update({ status: "completed", duration_minutes } as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["training_sessions"] }); toast.success("Sessão concluída"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useSessionSets(sessionId: string | undefined) {
  return useQuery({
    queryKey: ["session_sets", sessionId],
    queryFn: async () => {
      const { data, error } = await supabase.from("session_sets" as any).select("*").eq("session_id", sessionId!).order("exercise_name").order("set_number");
      if (error) throw error;
      return data as unknown as SessionSet[];
    },
    enabled: !!sessionId,
  });
}

export function useAddSet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Omit<SessionSet, "id">) => {
      const { data, error } = await supabase.from("session_sets" as any).insert(input as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: ["session_sets", v.session_id] }); },
    onError: (e: any) => toast.error(e.message),
  });
}
