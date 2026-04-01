const APP_URL = import.meta.env.VITE_APP_URL || "https://acmenexusfit.casa";
const BASE_URL = import.meta.env.VITE_BASE_URL || APP_URL;
const API_URL = import.meta.env.VITE_SUPABASE_URL || `${BASE_URL}/api`;

export const env = {
  APP_URL,
  BASE_URL,
  API_URL,
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
