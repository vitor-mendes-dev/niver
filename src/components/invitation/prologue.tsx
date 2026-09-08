import { event } from "@/lib/event";
import { GoldRule, SectionKicker } from "./ornament";

export function Prologue({
  opening,
  onOpen,
}: {
  opening: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-40 overflow-hidden bg-night ${opening ? "prologue-iris" : ""}`}
    >
      <img
        src="/images/night.jpg"
        alt=""
        className="ken-burns absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-night/55" />
      <div className="vignette absolute inset-0" />

      <div className="relative flex h-dvh flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 space-y-4">
          <p className="font-label text-xs tracking-label text-gold uppercase">
            {event.dateLabel}
          </p>
          <SectionKicker>Um convite especial</SectionKicker>
          <GoldRule />
        </div>

        <button
          type="button"
          onClick={onOpen}
          disabled={opening}
          className="float-slow group relative max-w-md overflow-hidden border border-gold/35 bg-night-deep/40 p-2 shadow-film transition-transform duration-150 ease-out active:scale-[0.96] disabled:opacity-80"
          aria-label="Abrir convite"
        >
          <img
            src="/images/envelope.jpg"
            alt="Envelope lacrado em cera dourada"
            className="h-64 w-full object-cover sm:h-80"
          />
          <span className="scrim-bottom absolute inset-0" />
        </button>

        <div className="mt-10 flex flex-col items-center gap-5">
          <p className="max-w-xs font-display text-lg text-cream-muted italic sm:text-xl">
            Uma noite reservada para Débora Michele.
          </p>
          <button
            type="button"
            onClick={onOpen}
            disabled={opening}
            className="min-h-12 border border-gold bg-night/50 px-8 font-label text-xs tracking-label text-cream uppercase transition-[background-color,color,transform] duration-200 ease-out hover:bg-gold hover:text-night active:scale-[0.96] disabled:opacity-70"
          >
            Abrir convite
          </button>
        </div>
      </div>
    </div>
  );
}
