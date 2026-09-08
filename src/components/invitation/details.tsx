import { event } from "@/lib/event";
import { detailCards } from "./panels";
import { GoldRule, SectionKicker } from "./ornament";
import { Reveal } from "./reveal";
import { assetPath } from "@/lib/utils";

export function Details() {
  return (
    <section className="relative overflow-hidden bg-night px-6 py-24 md:py-32">
      <img
        src={assetPath("/images/night.jpg")}
        alt=""
        className="absolute inset-0 size-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-night/70" />

      <div className="relative mx-auto max-w-xl">
        <Reveal className="text-center">
          <SectionKicker>Detalhes da noite</SectionKicker>
          <h2 className="mt-4 font-display text-display text-cream">
            Tudo foi pensado para você.
          </h2>
          <GoldRule className="my-8" />
        </Reveal>

        <div className="space-y-3">
          {detailCards.map((card, index) => {
            const Icon = card.icon;
            const Panel = card.Panel;
            return (
              <Reveal key={card.id} delay={index * 80}>
                <Panel>
                  <button
                    type="button"
                    className="gold-frame group flex w-full flex-col items-start border border-gold/25 bg-night/55 p-5 text-left transition-[border-color,background-color] duration-200 hover:border-gold/60 hover:bg-night/70"
                  >
                    <span className="flex items-center gap-3 font-label text-xs tracking-label text-gold uppercase">
                      <Icon className="size-4" strokeWidth={1.5} />
                      {card.kicker}
                    </span>
                    <span className="mt-3 font-display text-lg text-cream-muted">
                      {card.title}
                    </span>
                    <span className="mt-5 font-label text-xs tracking-label text-gold-bright uppercase">
                      {card.action}
                    </span>
                  </button>
                </Panel>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center font-display text-sm text-muted">
          {event.venue} · {event.city}
        </p>
      </div>
    </section>
  );
}
