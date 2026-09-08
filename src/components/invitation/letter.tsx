import { event } from "@/lib/event";
import { GoldRule, SectionKicker } from "./ornament";
import { Reveal } from "./reveal";

export function Letter() {
  return (
    <section
      id="convite"
      className="relative overflow-hidden bg-night-deep px-6 py-28 md:py-36"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-4 hidden w-px bg-gold/20 md:left-10 md:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-4 hidden w-px bg-gold/20 md:right-10 md:block"
        aria-hidden
      />

      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SectionKicker>Um convite especial</SectionKicker>
          <GoldRule className="mt-5 mb-8" />
          <h2 className="font-display text-display font-medium tracking-wide text-cream uppercase">
            Você está sendo convidado
          </h2>
          <p className="mt-4 font-display text-lg text-cream-muted italic">
            para celebrar uma noite muito especial.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-14">
          <p className="font-label text-xs tracking-label text-gold uppercase">
            Aniversariante
          </p>
          <p className="mt-4 font-display text-name font-medium tracking-tight text-gold-bright italic">
            {event.honoree}
          </p>
          <GoldRule className="mt-6" />
        </Reveal>

        <Reveal delay={140} className="mt-12 space-y-5">
          {event.letter.map((paragraph) => (
            <p
              key={paragraph}
              className="font-display text-lg leading-relaxed text-cream-muted md:text-xl"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
