import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  mode: "chat" | "mentor";
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
}

export function useConversations(mode?: "chat" | "mentor") {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["conversations", user?.id, mode],
    queryFn: async () => {
      let q = supabase.from("conversations" as any).select("*").order("updated_at", { ascending: false });
      if (mode) q = q.eq("mode", mode);
      const { data, error } = await q;
      if (error) throw error;
      return data as Conversation[];
    },
    enabled: !!user,
  });
}

export function useMessages(conversationId: string | undefined) {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const { data, error } = await supabase.from("messages" as any).select("*").eq("conversation_id", conversationId!).order("created_at");
      if (error) throw error;
      return data as Message[];
    },
    enabled: !!conversationId,
  });
}

export function useCreateConversation() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: { title?: string; mode?: "chat" | "mentor" }) => {
      const { data, error } = await supabase.from("conversations" as any).insert({
        user_id: user!.id,
        title: input.title || "Nova Conversa",
        mode: input.mode || "chat",
      } as any).select().single();
      if (error) throw error;
      return data as Conversation;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["conversations"] }); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useSaveMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { conversation_id: string; role: string; content: string }) => {
      const { data, error } = await supabase.from("messages" as any).insert(input as any).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: ["messages", v.conversation_id] }); },
    onError: (e: any) => toast.error(e.message),
  });
}
