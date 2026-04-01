import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface StoreProduct {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  type: string;
  price: number;
  file_url: string | null;
  cover_url: string | null;
  status: string;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface StorePurchase {
  id: string;
  user_id: string;
  product_id: string;
  price_paid: number;
  created_at: string;
}

export function useStoreProducts() {
  return useQuery({
    queryKey: ["store_products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_products" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as StoreProduct[];
    },
  });
}

export function useMyProducts() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my_products", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_products" as any)
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as StoreProduct[];
    },
    enabled: !!user,
  });
}

export function useMyPurchases() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["my_purchases", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_purchases" as any)
        .select("*, store_products(*)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as (StorePurchase & { store_products: StoreProduct })[];
    },
    enabled: !!user,
  });
}

export function useSubmitProduct() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: { title: string; description?: string; type: string; price: number; file?: File }) => {
      let file_url: string | null = null;
      if (input.file) {
        const path = `${user!.id}/store/${Date.now()}_${input.file.name}`;
        const { error: uploadError } = await supabase.storage.from("uploads").upload(path, input.file, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("uploads").getPublicUrl(path);
        file_url = urlData.publicUrl;
      }
      const { data, error } = await supabase
        .from("store_products" as any)
        .insert({ user_id: user!.id, title: input.title, description: input.description || null, type: input.type, price: input.price, file_url, status: "pending" } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store_products"] });
      qc.invalidateQueries({ queryKey: ["my_products"] });
      toast.success("Produto submetido para aprovação");
    },
    onError: (e: any) => toast.error(e.message),
  });
}

export function usePurchaseProduct() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (product: StoreProduct) => {
      const { data, error } = await supabase
        .from("store_purchases" as any)
        .insert({ user_id: user!.id, product_id: product.id, price_paid: product.price } as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my_purchases"] });
      toast.success("Compra realizada! Produto disponível na Biblioteca.");
    },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useApproveProduct() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ productId, approve }: { productId: string; approve: boolean }) => {
      const { data, error } = await supabase
        .from("store_products" as any)
        .update({
          status: approve ? "approved" : "rejected",
          approved_by: user!.id,
          approved_at: new Date().toISOString(),
        } as any)
        .eq("id", productId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["store_products"] });
      toast.success(vars.approve ? "Produto aprovado" : "Produto rejeitado");
    },
    onError: (e: any) => toast.error(e.message),
  });
}
