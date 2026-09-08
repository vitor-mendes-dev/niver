import { createClient } from "@supabase/supabase-js";

// Configuração do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://iqtiotmcswltsfmclufa.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_0oS9Pv72ewQ6Na4Jk_4OvQ_k3Jl0ddE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para TypeScript
export type RsvpRecord = {
  id?: string;
  name: string;
  attending: boolean;
  guests: number;
  message: string;
  created_at?: string;
  updated_at?: string;
};

export type ReservedGift = {
  id?: string;
  gift_id: string;
  reserved_by: string;
  created_at?: string;
};
