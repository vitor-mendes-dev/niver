import { supabase } from "./supabase";
import type { GiftId } from "./event";

export type RsvpRecord = {
  id?: string;
  name: string;
  attending: boolean;
  guests: number;
  message: string;
  at?: string;
  created_at?: string;
  updated_at?: string;
};

// RSVP Functions usando Supabase
export async function readRsvp(): Promise<RsvpRecord | null> {
  try {
    // Tenta pegar o RSVP do usuário atual pelo nome (localStorage como cache)
    const cachedName = localStorage.getItem("user-name");
    if (!cachedName) return null;

    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .eq("name", cachedName)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.name,
      attending: data.attending,
      guests: data.guests,
      message: data.message || "",
      at: data.created_at,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  } catch {
    return null;
  }
}

export async function writeRsvp(record: RsvpRecord): Promise<boolean> {
  try {
    // Salva nome no localStorage como cache
    localStorage.setItem("user-name", record.name);

    // Verifica se já existe um RSVP desse usuário
    const { data: existing } = await supabase
      .from("rsvps")
      .select("id")
      .eq("name", record.name)
      .single();

    if (existing) {
      // Atualiza
      const { error } = await supabase
        .from("rsvps")
        .update({
          attending: record.attending,
          guests: record.guests,
          message: record.message,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      return !error;
    } else {
      // Insere novo
      const { error } = await supabase.from("rsvps").insert({
        name: record.name,
        attending: record.attending,
        guests: record.guests,
        message: record.message,
      });

      return !error;
    }
  } catch {
    return false;
  }
}

// Gift Functions usando Supabase
export async function readReservedGifts(): Promise<GiftId[]> {
  try {
    const { data, error } = await supabase
      .from("reserved_gifts")
      .select("gift_id");

    if (error || !data) return [];

    return data.map((item) => item.gift_id as GiftId);
  } catch {
    return [];
  }
}

export async function toggleGift(
  id: GiftId,
  userName: string
): Promise<GiftId[]> {
  try {
    // Verifica se o presente já está reservado
    const { data: existing } = await supabase
      .from("reserved_gifts")
      .select("*")
      .eq("gift_id", id)
      .single();

    if (existing) {
      // Remove a reserva
      await supabase.from("reserved_gifts").delete().eq("gift_id", id);
    } else {
      // Adiciona a reserva
      await supabase.from("reserved_gifts").insert({
        gift_id: id,
        reserved_by: userName,
      });
    }

    // Retorna a lista atualizada
    return await readReservedGifts();
  } catch {
    return await readReservedGifts();
  }
}
