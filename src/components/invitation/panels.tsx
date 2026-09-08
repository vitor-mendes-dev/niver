"use client";

import { useEffect, useState } from "react";
import { Gift, MapPin, Sparkles } from "lucide-react";
import { event, type GiftId } from "@/lib/event";
import {
  readReservedGifts,
  readRsvp,
  toggleGift,
  writeRsvp,
  type RsvpRecord,
} from "@/lib/storage";
import { cn, assetPath } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function PanelShell({
  image,
  kicker,
  title,
  children,
}: {
  image: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative h-40 overflow-hidden">
        <img src={image} alt="" className="size-full object-cover" />
        <div className="scrim-panel absolute inset-0" />
      </div>
      <div className="overflow-y-auto px-6 pt-6 pb-8">
        <p className="font-label text-xs tracking-label text-gold uppercase">{kicker}</p>
        <DialogTitle className="mt-2 font-display text-3xl text-cream">{title}</DialogTitle>
        <DialogDescription className="sr-only">{title}</DialogDescription>
        <div className="mt-6">{children}</div>
      </div>
    </>
  );
}

export function GiftsPanel({ children }: { children: React.ReactNode }) {
  const [reserved, setReserved] = useState<GiftId[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carrega presentes reservados do Supabase
    readReservedGifts().then(setReserved);
  }, []);

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(event.pixKey);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function handleToggleGift(giftId: GiftId) {
    setLoading(true);
    // Pega nome do usuário do localStorage (salvo no RSVP)
    const userName = localStorage.getItem("user-name") || "Convidado";
    const updated = await toggleGift(giftId, userName);
    setReserved(updated);
    setLoading(false);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <PanelShell
          image={assetPath("/images/table.jpg")}
          kicker="Para ela"
          title="Lista de presentes"
        >
          <p className="mb-6 font-display text-base text-cream-muted">
            Escolha um gesto — ou contribua como quiser. O que importa é estar na
            história.
          </p>
          <ul className="space-y-3">
            {event.gifts.map((gift) => {
              const taken = reserved.includes(gift.id);
              return (
                <li
                  key={gift.id}
                  className="border border-gold/20 bg-night/40 px-4 py-4"
                >
                  <p className="font-display text-lg text-cream">{gift.title}</p>
                  <p className="mt-1 font-display text-sm text-cream-muted">
                    {gift.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleToggleGift(gift.id)}
                    disabled={loading}
                    className={cn(
                      "mt-3 min-h-11 font-label text-xs tracking-label uppercase transition-colors duration-150 disabled:opacity-50",
                      taken ? "text-gold-bright" : "text-gold hover:text-cream",
                    )}
                  >
                    {taken ? "Reservado — tocar para soltar" : "Quero este"}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 border border-gold/25 px-4 py-4">
            <p className="font-label text-xs tracking-label text-gold uppercase">
              Contribuição
            </p>
            <p className="mt-2 font-display text-cream">{event.pixKey}</p>
            <button
              type="button"
              onClick={copyPix}
              className="mt-2 min-h-11 font-label text-xs tracking-label text-gold uppercase hover:text-cream"
            >
              {copied ? "Chave copiada" : "Copiar chave Pix"}
            </button>
          </div>
        </PanelShell>
      </DialogContent>
    </Dialog>
  );
}

export function LocationPanel({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <PanelShell
          image={assetPath("/images/lantern.jpg")}
          kicker="Onde a noite acontece"
          title={event.venue}
        >
          <p className="font-display text-lg text-cream">{event.address}</p>
          <p className="font-display text-base text-cream-muted">{event.city}</p>
          <p className="mt-4 font-display text-base text-cream-muted">
            {event.dateLong} · {event.timeLabel}
          </p>
          <p className="mt-4 font-display text-base text-cream-muted">{event.dress}</p>
          <p className="mt-2 font-display text-base text-cream-muted">{event.parking}</p>
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-12 items-center border border-gold px-6 font-label text-xs tracking-label text-cream uppercase transition-colors duration-200 hover:bg-gold hover:text-night"
          >
            Como chegar
          </a>
        </PanelShell>
      </DialogContent>
    </Dialog>
  );
}

export function RsvpPanel({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<RsvpRecord | null>(null);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carrega RSVP existente do Supabase
    readRsvp().then((existing) => {
      if (existing) {
        setSaved(existing);
        setName(existing.name);
        setAttending(existing.attending);
        setGuests(existing.guests);
        setMessage(existing.message);
      }
    });
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Escreva o seu nome.");
      return;
    }
    if (attending === null) {
      setError("Diga se estará conosco.");
      return;
    }

    setLoading(true);
    setError("");

    const record: RsvpRecord = {
      name: name.trim(),
      attending,
      guests: attending ? guests : 0,
      message: message.trim(),
      at: new Date().toISOString(),
    };

    const success = await writeRsvp(record);

    setLoading(false);

    if (success) {
      setSaved(record);
      setError("");
    } else {
      setError("Erro ao salvar. Tente novamente.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <PanelShell
          image={assetPath("/images/hero.jpg")}
          kicker="Confirme sua presença"
          title="Sua presença é parte da história."
        >
          {saved ? (
            <div className="space-y-4">
              <p className="font-display text-xl text-gold-bright italic">
                {saved.attending
                  ? `Recebemos o seu sim, ${saved.name}.`
                  : `Sentiremos a sua falta, ${saved.name}.`}
              </p>
              <p className="font-display text-base text-cream-muted">
                {saved.attending
                  ? "Até a noite — traga apenas o seu tempo."
                  : "Obrigado por nos avisar com carinho."}
              </p>
              {saved.message ? (
                <p className="border-l border-gold/40 pl-4 font-display text-cream-muted italic">
                  “{saved.message}”
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => setSaved(null)}
                className="min-h-11 font-label text-xs tracking-label text-gold uppercase hover:text-cream"
              >
                Alterar confirmação
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <label className="block">
                <span className="font-label text-xs tracking-label text-gold uppercase">
                  Nome completo
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 h-12 w-full border border-gold/30 bg-night px-3 font-display text-lg text-cream outline-none transition-[border-color] duration-150 focus:border-gold"
                  autoComplete="name"
                />
              </label>

              <fieldset>
                <legend className="font-label text-xs tracking-label text-gold uppercase">
                  Você estará conosco?
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    { value: true, label: "Com alegria, sim" },
                    { value: false, label: "Infelizmente não" },
                  ].map((option) => (
                    <button
                      key={String(option.value)}
                      type="button"
                      onClick={() => setAttending(option.value)}
                      className={cn(
                        "min-h-12 border px-3 font-display text-sm transition-colors duration-150",
                        attending === option.value
                          ? "border-gold bg-gold text-night"
                          : "border-gold/30 text-cream hover:border-gold",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {attending ? (
                <fieldset>
                  <legend className="font-label text-xs tracking-label text-gold uppercase">
                    Acompanhantes
                  </legend>
                  <div className="mt-3 flex gap-2">
                    {[0, 1, 2, 3].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setGuests(n)}
                        className={cn(
                          "flex size-12 items-center justify-center border font-display text-lg tabular-nums transition-colors duration-150",
                          guests === n
                            ? "border-gold bg-gold text-night"
                            : "border-gold/30 text-cream hover:border-gold",
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              <label className="block">
                <span className="font-label text-xs tracking-label text-gold uppercase">
                  Uma linha para Débora
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="mt-2 w-full border border-gold/30 bg-night px-3 py-3 font-display text-lg text-cream outline-none transition-[border-color] duration-150 focus:border-gold"
                />
              </label>

              {error ? (
                <p className="font-display text-sm text-gold-bright">{error}</p>
              ) : (
                <p className="font-display text-sm text-muted">
                  Confirme até {event.rsvpUntil}.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center border border-gold bg-gold/10 font-label text-xs tracking-label text-cream uppercase transition-colors duration-200 hover:bg-gold hover:text-night disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Salvando..." : "Enviar confirmação"}
              </button>
            </form>
          )}
        </PanelShell>
      </DialogContent>
    </Dialog>
  );
}

export const detailCards = [
  {
    id: "gifts",
    kicker: "Lista de presentes",
    title: "Escolha um presente para fazer parte desse momento.",
    action: "Ver lista",
    icon: Gift,
    Panel: GiftsPanel,
  },
  {
    id: "location",
    kicker: "Localização",
    title: "Prepare-se para viver essa noite.",
    action: "Como chegar",
    icon: MapPin,
    Panel: LocationPanel,
  },
  {
    id: "rsvp",
    kicker: "Confirme sua presença",
    title: "Sua presença é muito importante para nós.",
    action: "Confirmar presença",
    icon: Sparkles,
    Panel: RsvpPanel,
  },
] as const;
