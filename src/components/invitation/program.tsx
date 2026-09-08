import { event } from "@/lib/event";
import { GoldRule, SectionKicker } from "./ornament";
import { Reveal } from "./reveal";

export function Program() {
  return (
    <section className="relative overflow-hidden bg-night-deep px-6 py-24 md:py-32">
      <img
        src="/images/table.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-night/75" />

      <div className="relative mx-auto max-w-xl text-center">
        <Reveal>
          <SectionKicker>A ordem da noite</SectionKicker>
          <h2 className="mt-4 font-display text-display text-cream">Tudo ao seu tempo.</h2>
          <GoldRule className="my-8" />
        </Reveal>

        <ol className="space-y-0 text-left">
          {event.program.map((item, index) => (
            <Reveal key={item.time} delay={index * 70}>
              <li className="grid grid-cols-[5.5rem_1fr] gap-5 border-t border-gold/20 py-6 last:border-b">
                <span className="font-label text-xs tracking-wide text-gold">
                  {item.time}
                </span>
                <div>
                  <p className="font-display text-xl text-cream">{item.title}</p>
                  <p className="mt-1 font-display text-base text-cream-muted">
                    {item.detail}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
