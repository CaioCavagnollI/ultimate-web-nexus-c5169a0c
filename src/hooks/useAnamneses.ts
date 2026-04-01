import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { Tables, TablesInsert, Json } from "@/integrations/supabase/types";

export type Anamnesis = Tables<"anamneses"> & { client_name?: string };

export function useAnamneses() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["anamneses", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("anamneses")
        .select("*, clients(name)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data.map((a) => ({ ...a, client_name: a.clients?.name }));
    },
    enabled: !!user,
  });
}

export function useAnamnesis(id: string | undefined) {
  return useQuery({
    queryKey: ["anamneses", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("anamneses").select("*, clients(name)").eq("id", id!).single();
      if (error) throw error;
      return { ...data, client_name: data.clients?.name };
    },
    enabled: !!id,
  });
}

export function useCreateAnamnesis() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: { client_id?: string; data: Record<string, unknown>; status?: string }) => {
      const { data, error } = await supabase.from("anamneses").insert({
        user_id: user!.id,
        client_id: input.client_id || null,
        data: input.data,
        status: input.status || "draft",
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["anamneses"] }); toast.success("Anamnese salva"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdateAnamnesis() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: { id: string; data?: Record<string, unknown>; status?: string; client_id?: string }) => {
      const update: Record<string, unknown> = {};
      if (input.data !== undefined) update.data = input.data;
      if (input.status !== undefined) update.status = input.status;
      if (input.client_id !== undefined) update.client_id = input.client_id;
      const { data, error } = await supabase.from("anamneses").update(update).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["anamneses"] }); toast.success("Anamnese atualizada"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDuplicateAnamnesis() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (sourceId: string) => {
      const { data: source, error: fetchErr } = await supabase.from("anamneses").select("*").eq("id", sourceId).single();
      if (fetchErr) throw fetchErr;
      const { data, error } = await supabase.from("anamneses").insert({
        user_id: user!.id,
        client_id: source.client_id,
        data: source.data,
        status: "draft",
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["anamneses"] }); toast.success("Anamnese duplicada"); },
    onError: (e: Error) => toast.error(e.message),
  });
}
