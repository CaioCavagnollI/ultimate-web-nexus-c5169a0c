import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Tables } from "@/integrations/supabase/types";

export type LibraryItem = Tables<"library_items">;

export function useLibraryItems() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["library_items", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("library_items")
        .select("*, store_products(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}
