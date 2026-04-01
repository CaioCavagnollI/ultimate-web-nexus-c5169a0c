import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface Client {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  birth_date: string | null;
  sex: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export function useClients() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["clients", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("clients" as any).select("*").order("name");
      if (error) throw error;
      return data as unknown as Client[];
    },
    enabled: !!user,
  });
}

export function useClient(id: string | undefined) {
  return useQuery({
    queryKey: ["clients", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("clients" as any).select("*").eq("id", id!).single();
      if (error) throw error;
      return data as unknown as Client;
    },
    enabled: !!id,
  });
}

export function useCreateClient() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: Partial<Client>) => {
      const { data, error } = await supabase.from("clients" as any).insert({ ...input, user_id: user!.id } as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["clients"] }); toast.success("Cliente criado"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: Partial<Client> & { id: string }) => {
      const { data, error } = await supabase.from("clients" as any).update(input as any).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["clients"] }); toast.success("Cliente atualizado"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeleteClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("clients" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["clients"] }); toast.success("Cliente removido"); },
    onError: (e: any) => toast.error(e.message),
  });
}
