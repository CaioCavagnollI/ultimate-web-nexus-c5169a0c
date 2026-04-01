import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface Anamnesis {
  id: string;
  user_id: string;
  client_id: string | null;
  status: "draft" | "completed";
  data: Record<string, any>;
  created_at: string;
  updated_at: string;
  client_name?: string;
}

export function useAnamneses() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["anamneses", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("anamneses" as any)
        .select("*, clients(name)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data as any[]).map((a) => ({ ...a, client_name: a.clients?.name })) as Anamnesis[];
    },
    enabled: !!user,
  });
}

export function useAnamnesis(id: string | undefined) {
  return useQuery({
    queryKey: ["anamneses", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("anamneses" as any).select("*, clients(name)").eq("id", id!).single();
      if (error) throw error;
      return { ...data, client_name: (data as any).clients?.name } as Anamnesis;
    },
    enabled: !!id,
  });
}

export function useCreateAnamnesis() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: { client_id?: string; data: Record<string, any>; status?: string }) => {
      const { data, error } = await supabase.from("anamneses" as any).insert({
        user_id: user!.id,
        client_id: input.client_id || null,
        data: input.data as any,
        status: input.status || "draft",
      } as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["anamneses"] }); toast.success("Anamnese salva"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateAnamnesis() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: { id: string; data?: Record<string, any>; status?: string; client_id?: string }) => {
      const update: any = {};
      if (input.data) update.data = input.data;
      if (input.status) update.status = input.status;
      if (input.client_id !== undefined) update.client_id = input.client_id;
      const { data, error } = await supabase.from("anamneses" as any).update(update).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["anamneses"] }); toast.success("Anamnese atualizada"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDuplicateAnamnesis() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (sourceId: string) => {
      const { data: source, error: fetchErr } = await supabase.from("anamneses" as any).select("*").eq("id", sourceId).single();
      if (fetchErr) throw fetchErr;
      const { data, error } = await supabase.from("anamneses" as any).insert({
        user_id: user!.id,
        client_id: (source as any).client_id,
        data: (source as any).data,
        status: "draft",
      } as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["anamneses"] }); toast.success("Anamnese duplicada"); },
    onError: (e: any) => toast.error(e.message),
  });
}
