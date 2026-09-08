"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Download, Users, Gift, CheckCircle2, XCircle, User } from "lucide-react";
import type { RsvpRecord } from "@/lib/storage";
import type { GiftId } from "@/lib/event";
import { event } from "@/lib/event";

// Senha de acesso (em produção, use Supabase Auth)
const ADMIN_PASSWORD = "debora2026";

type ReservedGift = {
  gift_id: string;
  reserved_by: string;
  created_at: string;
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [gifts, setGifts] = useState<ReservedGift[]>([]);
  const [loading, setLoading] = useState(true);

  // Verifica se já está autenticado
  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin-auth") === "true";
    setAuthenticated(isAuth);
    if (isAuth) {
      loadData();
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-auth", "true");
      setAuthenticated(true);
      setError("");
      loadData();
    } else {
      setError("Senha incorreta");
    }
  }

  async function loadData() {
    setLoading(true);
    
    // Carregar RSVPs
    const { data: rsvpData } = await supabase
      .from("rsvps")
      .select("*")
      .order("created_at", { ascending: false });

    if (rsvpData) {
      setRsvps(rsvpData as RsvpRecord[]);
    }

    // Carregar presentes reservados
    const { data: giftData } = await supabase
      .from("reserved_gifts")
      .select("*")
      .order("created_at", { ascending: false });

    if (giftData) {
      setGifts(giftData as ReservedGift[]);
    }

    setLoading(false);
  }

  function handleLogout() {
    sessionStorage.removeItem("admin-auth");
    setAuthenticated(false);
    setPassword("");
  }

  function exportToCSV() {
    const csv = [
      ["Nome", "Confirmou", "Acompanhantes", "Total Pessoas", "Mensagem", "Data"],
      ...rsvps.map((rsvp) => [
        rsvp.name,
        rsvp.attending ? "Sim" : "Não",
        rsvp.guests.toString(),
        (rsvp.attending ? 1 + rsvp.guests : 0).toString(),
        rsvp.message || "",
        new Date(rsvp.created_at || "").toLocaleString("pt-BR"),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `convidados-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  }

  // Estatísticas
  const confirmedRsvps = rsvps.filter((r) => r.attending);
  const totalPeople = confirmedRsvps.reduce((sum, r) => sum + 1 + r.guests, 0);
  const declinedRsvps = rsvps.filter((r) => !r.attending);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-night-soft border border-gold/20 p-8">
          <h1 className="font-display text-3xl text-cream text-center mb-2">
            Painel Administrativo
          </h1>
          <p className="font-display text-muted text-center mb-6">
            Convite de Aniversário - Débora Michele
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-label text-xs tracking-label text-gold uppercase mb-2">
                Senha de acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 border border-gold/30 bg-night px-4 font-display text-lg text-cream outline-none focus:border-gold"
                placeholder="Digite a senha"
                autoFocus
              />
            </div>

            {error && (
              <p className="font-display text-sm text-gold-bright">{error}</p>
            )}

            <button
              type="submit"
              className="w-full h-12 border border-gold bg-gold/10 font-label text-xs tracking-label text-cream uppercase hover:bg-gold hover:text-night transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center">
        <p className="font-display text-2xl text-cream">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl text-cream mb-2">
              Painel Administrativo
            </h1>
            <p className="font-display text-muted">
              {event.honoree} · {event.dateLabel}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 h-11 px-4 border border-gold bg-gold/10 font-label text-xs tracking-label text-cream uppercase hover:bg-gold hover:text-night transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
            <button
              onClick={handleLogout}
              className="h-11 px-4 border border-gold/30 font-label text-xs tracking-label text-gold uppercase hover:border-gold hover:text-cream transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-night-soft border border-gold/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-gold" />
              <p className="font-label text-xs tracking-label text-gold uppercase">
                Confirmados
              </p>
            </div>
            <p className="font-display text-4xl text-cream">{confirmedRsvps.length}</p>
          </div>

          <div className="bg-night-soft border border-gold/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-gold" />
              <p className="font-label text-xs tracking-label text-gold uppercase">
                Total de Pessoas
              </p>
            </div>
            <p className="font-display text-4xl text-cream">{totalPeople}</p>
          </div>

          <div className="bg-night-soft border border-gold/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-5 h-5 text-muted" />
              <p className="font-label text-xs tracking-label text-muted uppercase">
                Não Confirmados
              </p>
            </div>
            <p className="font-display text-4xl text-cream-muted">{declinedRsvps.length}</p>
          </div>

          <div className="bg-night-soft border border-gold/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Gift className="w-5 h-5 text-gold" />
              <p className="font-label text-xs tracking-label text-gold uppercase">
                Presentes Reservados
              </p>
            </div>
            <p className="font-display text-4xl text-cream">{gifts.length}</p>
          </div>
        </div>

        {/* Confirmados */}
        <div className="mb-8">
          <h2 className="font-display text-2xl text-cream mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-gold" />
            Convidados Confirmados ({confirmedRsvps.length})
          </h2>
          <div className="space-y-3">
            {confirmedRsvps.map((rsvp) => (
              <div
                key={rsvp.id}
                className="bg-night-soft border border-gold/20 p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gold" />
                      <p className="font-display text-xl text-cream">{rsvp.name}</p>
                    </div>
                    <p className="font-display text-sm text-muted">
                      Acompanhantes: <span className="text-gold">{rsvp.guests}</span> ·
                      Total: <span className="text-gold">{1 + rsvp.guests} pessoa(s)</span>
                    </p>
                    {rsvp.message && (
                      <p className="mt-3 border-l-2 border-gold/40 pl-3 font-display text-cream-muted italic">
                        "{rsvp.message}"
                      </p>
                    )}
                  </div>
                  <p className="font-display text-xs text-muted">
                    {new Date(rsvp.created_at || "").toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            ))}
            {confirmedRsvps.length === 0 && (
              <p className="font-display text-muted text-center py-8">
                Nenhuma confirmação ainda
              </p>
            )}
          </div>
        </div>

        {/* Não Confirmados */}
        {declinedRsvps.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-2xl text-cream-muted mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-muted" />
              Não Confirmados ({declinedRsvps.length})
            </h2>
            <div className="space-y-3">
              {declinedRsvps.map((rsvp) => (
                <div
                  key={rsvp.id}
                  className="bg-night-soft border border-gold/10 p-4 md:p-6 opacity-60"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-display text-lg text-cream-muted">{rsvp.name}</p>
                      {rsvp.message && (
                        <p className="mt-2 font-display text-sm text-muted italic">
                          "{rsvp.message}"
                        </p>
                      )}
                    </div>
                    <p className="font-display text-xs text-muted">
                      {new Date(rsvp.created_at || "").toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Presentes */}
        <div>
          <h2 className="font-display text-2xl text-cream mb-4 flex items-center gap-2">
            <Gift className="w-6 h-6 text-gold" />
            Presentes Reservados ({gifts.length})
          </h2>
          <div className="space-y-3">
            {gifts.map((gift) => {
              const giftInfo = event.gifts.find((g) => g.id === gift.gift_id);
              return (
                <div
                  key={gift.gift_id}
                  className="bg-night-soft border border-gold/20 p-4 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg text-cream">
                        {giftInfo?.title || gift.gift_id}
                      </p>
                      <p className="font-display text-sm text-muted mt-1">
                        Reservado por: <span className="text-gold">{gift.reserved_by}</span>
                      </p>
                    </div>
                    <p className="font-display text-xs text-muted">
                      {new Date(gift.created_at).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              );
            })}
            {gifts.length === 0 && (
              <p className="font-display text-muted text-center py-8">
                Nenhum presente reservado ainda
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
