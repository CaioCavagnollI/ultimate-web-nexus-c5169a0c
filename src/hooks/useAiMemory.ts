import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { Tables, TablesInsert, Json } from "@/integrations/supabase/types";

export type AiMemory = Tables<"ai_memory">;

export function useAiMemory(category?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["ai_memory", user?.id, category],
    queryFn: async () => {
      let q = supabase.from("ai_memory").select("*").order("updated_at", { ascending: false });
      if (category) q = q.eq("category", category);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useSaveMemory() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: { category: string; key: string; value: Json; source?: string; confidence?: number }) => {
      const { data, error } = await supabase.from("ai_memory").insert({
        user_id: user!.id,
        category: input.category,
        key: input.key,
        value: input.value,
        source: input.source,
        confidence: input.confidence,
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["ai_memory"] }); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeleteMemory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("ai_memory").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["ai_memory"] }); },
    onError: (e: Error) => toast.error(e.message),
  });
}
