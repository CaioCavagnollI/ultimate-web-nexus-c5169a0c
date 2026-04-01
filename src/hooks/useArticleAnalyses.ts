import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type ArticleAnalysis = Tables<"article_analyses">;

export function useArticleAnalyses() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["article_analyses", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("article_analyses").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useSaveArticleAnalysis() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: Omit<TablesInsert<"article_analyses">, "user_id">) => {
      const { data, error } = await supabase.from("article_analyses").insert({ ...input, user_id: user!.id }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["article_analyses"] }); toast.success("Análise salva"); },
    onError: (e: Error) => toast.error(e.message),
  });
}
