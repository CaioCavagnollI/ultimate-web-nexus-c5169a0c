import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface PrescriptionExercise {
  id: string;
  prescription_id: string;
  name: string;
  sets: number;
  reps: string;
  load: string | null;
  rpe: string | null;
  rir: string | null;
  rest_seconds: number | null;
  notes: string | null;
  sort_order: number;
  day_label: string | null;
}

export interface Prescription {
  id: string;
  user_id: string;
  client_id: string | null;
  anamnesis_id: string | null;
  title: string;
  status: "draft" | "active" | "archived";
  frequency_per_week: number | null;
  duration_weeks: number | null;
  split: string | null;
  notes: string | null;
  version: number;
  created_at: string;
  updated_at: string;
  client_name?: string;
  exercises?: PrescriptionExercise[];
}

export function usePrescriptions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["prescriptions", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prescriptions" as any)
        .select("*, clients(name), prescription_exercises(id)")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data as any[]).map((p) => ({
        ...p,
        client_name: p.clients?.name,
        exercise_count: p.prescription_exercises?.length || 0,
      })) as unknown as Prescription[];
    },
    enabled: !!user,
  });
}

export function usePrescription(id: string | undefined) {
  return useQuery({
    queryKey: ["prescriptions", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prescriptions" as any)
        .select("*, clients(name), prescription_exercises(*)")
        .eq("id", id!)
        .single();
      if (error) throw error;
      const d = data as any;
      return { ...d, client_name: d.clients?.name, exercises: d.prescription_exercises || [] } as unknown as Prescription;
    },
    enabled: !!id,
  });
}

export function useCreatePrescription() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (input: Partial<Prescription> & { exercises?: Omit<PrescriptionExercise, "prescription_id">[] }) => {
      const { exercises, ...rest } = input;
      const { data, error } = await supabase.from("prescriptions" as any).insert({
        ...rest,
        user_id: user!.id,
        status: rest.status || "draft",
        version: 1,
      } as any).select().single();
      if (error) throw error;
      if (exercises?.length) {
        const { error: exErr } = await supabase.from("prescription_exercises" as any).insert(
          exercises.map((e, i) => ({ ...e, prescription_id: (data as any).id, sort_order: i } as any))
        );
        if (exErr) throw exErr;
      }
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["prescriptions"] }); toast.success("Prescrição criada"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useUpdatePrescription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, exercises, ...input }: Partial<Prescription> & { id: string; exercises?: Omit<PrescriptionExercise, "prescription_id">[] }) => {
      const { data, error } = await supabase.from("prescriptions" as any).update(input as any).eq("id", id).select().single();
      if (error) throw error;
      if (exercises) {
        await supabase.from("prescription_exercises" as any).delete().eq("prescription_id", id);
        if (exercises.length) {
          const { error: exErr } = await supabase.from("prescription_exercises" as any).insert(
            exercises.map((e, i) => ({ ...e, prescription_id: id, sort_order: i } as any))
          );
          if (exErr) throw exErr;
        }
      }
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["prescriptions"] }); toast.success("Prescrição atualizada"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDuplicatePrescription() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (sourceId: string) => {
      const { data: src, error: fe } = await supabase.from("prescriptions" as any).select("*, prescription_exercises(*)").eq("id", sourceId).single();
      if (fe) throw fe;
      const s = src as any;
      const { data, error } = await supabase.from("prescriptions" as any).insert({
        user_id: user!.id,
        client_id: s.client_id,
        anamnesis_id: s.anamnesis_id,
        title: s.title + " (cópia)",
        status: "draft",
        frequency_per_week: s.frequency_per_week,
        duration_weeks: s.duration_weeks,
        split: s.split,
        notes: s.notes,
      } as any).select().single();
      if (error) throw error;
      const exs = s.prescription_exercises || [];
      if (exs.length) {
        await supabase.from("prescription_exercises" as any).insert(
          exs.map((e: any, i: number) => ({
            prescription_id: (data as any).id,
            name: e.name, sets: e.sets, reps: e.reps, load: e.load,
            rpe: e.rpe, rir: e.rir, rest_seconds: e.rest_seconds,
            notes: e.notes, sort_order: i, day_label: e.day_label,
          } as any))
        );
      }
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["prescriptions"] }); toast.success("Prescrição duplicada"); },
    onError: (e: any) => toast.error(e.message),
  });
}

export function useDeletePrescription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("prescriptions" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["prescriptions"] }); toast.success("Prescrição removida"); },
    onError: (e: any) => toast.error(e.message),
  });
}
