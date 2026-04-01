import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface ScannerResult {
  id: string;
  user_id: string;
  image_url: string | null;
  equipment_name: string | null;
  confidence: number | null;
  muscles: string[];
  exercises: string[];
  classification: string | null;
  created_at: string;
}

export function useScannerResults() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["scanner_results", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("scanner_results" as any).select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as ScannerResult[];
    },
    enabled: !!user,
  });
}

export function useSaveScanResult() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: Partial<ScannerResult>) => {
      const { data, error } = await supabase.from("scanner_results" as any).insert({ ...input, user_id: user!.id } as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["scanner_results"] }); toast.success("Scan salvo"); },
    onError: (e: any) => toast.error(e.message),
  });
}
