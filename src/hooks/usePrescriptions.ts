import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type PrescriptionExercise = Tables<"prescription_exercises">;
export type Prescription = Tables<"prescriptions"> & {
  client_name?: string;
  exercises?: PrescriptionExercise[];
  exercise_count?: number;
};

export function usePrescriptions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["prescriptions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prescriptions")
        .select("*, clients(name), prescription_exercises(id)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data.map((p) => ({
        ...p,
        client_name: p.clients?.name,
        exercise_count: p.prescription_exercises?.length || 0,
      }));
    },
    enabled: !!user,
  });
}

export function usePrescription(id: string | undefined) {
  return useQuery({
    queryKey: ["prescriptions", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prescriptions")
        .select("*, clients(name), prescription_exercises(*)")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return {
        ...data,
        client_name: data.clients?.name,
        exercises: data.prescription_exercises || [],
      };
    },
    enabled: !!id,
  });
}

export function useCreatePrescription() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: Partial<TablesInsert<"prescriptions">> & { exercises?: Omit<TablesInsert<"prescription_exercises">, "prescription_id">[] }) => {
      const { exercises, ...rest } = input;
      const { data, error } = await supabase.from("prescriptions").insert({
        ...rest,
        user_id: user!.id,
        status: rest.status || "draft",
        version: 1,
      }).select().single();
      if (error) throw error;
      if (exercises?.length) {
        const { error: exErr } = await supabase.from("prescription_exercises").insert(
          exercises.map((e, i) => ({ ...e, prescription_id: data.id, sort_order: i }))
        );
        if (exErr) throw exErr;
      }
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["prescriptions"] }); toast.success("Prescrição criada"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUpdatePrescription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, exercises, ...input }: { id: string; exercises?: Omit<TablesInsert<"prescription_exercises">, "prescription_id">[] } & Record<string, unknown>) => {
      const { data, error } = await supabase.from("prescriptions").update(input).eq("id", id).select().single();
      if (error) throw error;
      if (exercises) {
        await supabase.from("prescription_exercises").delete().eq("prescription_id", id);
        if (exercises.length) {
          const { error: exErr } = await supabase.from("prescription_exercises").insert(
            exercises.map((e, i) => ({ ...e, prescription_id: id, sort_order: i }))
          );
          if (exErr) throw exErr;
        }
      }
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["prescriptions"] }); toast.success("Prescrição atualizada"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDuplicatePrescription() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (sourceId: string) => {
      const { data: src, error: fe } = await supabase.from("prescriptions").select("*, prescription_exercises(*)").eq("id", sourceId).single();
      if (fe) throw fe;
      const { data, error } = await supabase.from("prescriptions").insert({
        user_id: user!.id,
        client_id: src.client_id,
        anamnesis_id: src.anamnesis_id,
        title: src.title + " (cópia)",
        status: "draft",
        frequency_per_week: src.frequency_per_week,
        duration_weeks: src.duration_weeks,
        split: src.split,
        notes: src.notes,
      }).select().single();
      if (error) throw error;
      const exs = src.prescription_exercises || [];
      if (exs.length) {
        await supabase.from("prescription_exercises").insert(
          exs.map((e, i: number) => ({
            prescription_id: data.id,
            name: e.name, sets: e.sets, reps: e.reps, load: e.load,
            rpe: e.rpe, rir: e.rir, rest_seconds: e.rest_seconds,
            notes: e.notes, sort_order: i, day_label: e.day_label,
          }))
        );
      }
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["prescriptions"] }); toast.success("Prescrição duplicada"); },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeletePrescription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("prescriptions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["prescriptions"] }); toast.success("Prescrição removida"); },
    onError: (e: Error) => toast.error(e.message),
  });
}
