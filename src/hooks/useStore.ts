import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type StoreProduct = Tables<"store_products">;
export type StorePurchase = Tables<"store_purchases">;

export function useStoreProducts(statusFilter?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["store_products", statusFilter, user?.id],
    queryFn: async () => {
      let q = supabase.from("store_products").select("*").order("created_at", { ascending: false });
      if (statusFilter) q = q.eq("status", statusFilter);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: Omit<TablesInsert<"store_products">, "user_id">) => {
      const { data, error } = await supabase.from("store_products").insert({ ...input, user_id: user!.id }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["store_products"] }); toast.success("Produto enviado para aprovação"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useApproveProduct() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("store_products").update({
        status: "approved",
        approved_by: user!.id,
        approved_at: new Date().toISOString(),
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["store_products"] }); toast.success("Produto aprovado"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function usePurchaseProduct() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ productId, price }: { productId: string; price: number }) => {
      const { data, error } = await supabase.from("store_purchases").insert({
        user_id: user!.id,
        product_id: productId,
        price_paid: price,
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["store_purchases"] }); toast.success("Compra realizada"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useMyPurchases() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["store_purchases", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("store_purchases").select("*, store_products(*)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}
