/**
 * Plan configuration — single source of truth for plan metadata.
 * Stripe price IDs are mapped here to avoid scattering them across the codebase.
 */
export interface PlanConfig {
  code: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  stripePriceIdMonthly: string | null;
  stripePriceIdYearly: string | null;
  features: string[];
}

export const plans: PlanConfig[] = [
  {
    code: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Acesso básico ao Atlas Chat e funcionalidades limitadas.",
    stripePriceIdMonthly: null,
    stripePriceIdYearly: null,
    features: ["Atlas Chat (5 msgs/dia)", "Scanner (3/dia)", "Prescrições básicas"],
  },
  {
    code: "pro",
    name: "Pro",
    monthlyPrice: 49.9,
    yearlyPrice: 478.8,
    description: "Plano profissional completo para personal trainers.",
    stripePriceIdMonthly: "price_1THfLOLBiU3vW738tErBSAHd",
    stripePriceIdYearly: "price_1THfMcLBiU3vW738DKp5PYYf",
    features: [
      "Atlas Chat ilimitado",
      "Atlas Mentor & Explain",
      "Atlas Prescription",
      "Scanner ilimitado",
      "Prescrições avançadas",
      "Performance completo",
      "Store (submissão)",
    ],
  },
  {
    code: "premium",
    name: "Premium",
    monthlyPrice: 89.9,
    yearlyPrice: 862.8,
    description: "Acesso total a todas as ferramentas e IA avançada.",
    stripePriceIdMonthly: "price_1THfN4LBiU3vW738VqJBz65Y",
    stripePriceIdYearly: "price_1THfNFLBiU3vW738LMZDePuJ",
    features: [
      "Tudo do Pro",
      "Atlas Research",
      "Atlas Article Analyzer",
      "Atlas Editorial",
      "Mentoria Premium",
      "Library completa",
      "Prioridade no suporte",
    ],
  },
];

export function getPlanByCode(code: string): PlanConfig | undefined {
  return plans.find((p) => p.code === code);
}

export function getStripePriceId(planCode: string, interval: "month" | "year"): string | null {
  const plan = getPlanByCode(planCode);
  if (!plan) return null;
  return interval === "year" ? plan.stripePriceIdYearly : plan.stripePriceIdMonthly;
}
