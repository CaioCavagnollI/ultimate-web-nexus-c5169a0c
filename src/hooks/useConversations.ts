import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type Conversation = Tables<"conversations">;
export type Message = Tables<"messages">;

export function useConversations(mode?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["conversations", user?.id, mode],
    queryFn: async () => {
      let q = supabase.from("conversations").select("*").order("updated_at", { ascending: false });
      if (mode) q = q.eq("mode", mode);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useMessages(conversationId: string | undefined) {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data, error } = await supabase.from("messages").select("*").eq("conversation_id", conversationId!).order("created_at");
      if (error) throw error;
      return data;
    },
    enabled: !!conversationId,
  });
}

export function useCreateConversation() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: { title?: string; mode?: string }) => {
      const { data, error } = await supabase.from("conversations").insert({
        user_id: user!.id,
        title: input.title || "Nova Conversa",
        mode: input.mode || "chat",
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["conversations"] }); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useSaveMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { conversation_id: string; role: string; content: string }) => {
      const { data, error } = await supabase.from("messages").insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: ["messages", v.conversation_id] }); },
    onError: (e: Error) => toast.error(e.message),
  });
}
