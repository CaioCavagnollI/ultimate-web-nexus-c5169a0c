import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type ScannerResult = Tables<"scanner_results">;

export function useScannerResults() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["scanner_results", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("scanner_results").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useSaveScanResult() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: Omit<TablesInsert<"scanner_results">, "user_id">) => {
      const { data, error } = await supabase.from("scanner_results").insert({ ...input, user_id: user!.id }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["scanner_results"] }); toast.success("Scan salvo"); },
    onError: (e: Error) => toast.error(e.message),
  });
}
