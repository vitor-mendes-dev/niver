import { createClient } from "@supabase/supabase-js";

// ⚠️ SUBSTITUA PELOS SEUS VALORES DO SUPABASE
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://SEU-PROJETO.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sua-anon-key-aqui";

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
