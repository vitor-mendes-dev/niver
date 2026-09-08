"use client";

import { useEffect, useState } from "react";
import { event } from "@/lib/event";
import { GoldRule, SectionKicker } from "./ornament";
import { Reveal } from "./reveal";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function split(ms: number): Parts {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown() {
  const target = new Date(event.iso).getTime();
  const [parts, setParts] = useState<Parts>(() => split(target - Date.now()));
  const arrived = parts.days + parts.hours + parts.minutes + parts.seconds === 0;

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(split(target - Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells: { value: string; label: string }[] = [
    { value: pad(parts.days), label: "Dias" },
    { value: pad(parts.hours), label: "Horas" },
    { value: pad(parts.minutes), label: "Min." },
    { value: pad(parts.seconds), label: "Seg." },
  ];

  return (
    <section className="bg-night px-6 py-24 md:py-32">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <SectionKicker>Marque este momento</SectionKicker>
          <h2 className="mt-4 font-display text-display tracking-wide text-cream uppercase">
            Save the date
          </h2>
          <GoldRule className="my-6" />
          <p className="font-label text-xs tracking-wide text-gold-bright uppercase">
            {event.dateLong}
          </p>
          <p className="mt-2 font-display text-2xl text-gold">{event.timeLabel}</p>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <div className="gold-frame border border-gold/30 bg-night-soft/60 px-4 py-8 md:px-8">
            {arrived ? (
              <p className="font-display text-2xl text-gold-bright italic">
                A noite chegou.
              </p>
            ) : (
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {cells.map((cell) => (
                  <div key={cell.label} className="flex flex-col items-center">
                    <span className="font-display text-count leading-none tabular-nums text-cream">
                      {cell.value}
                    </span>
                    <span className="mt-3 font-label text-xs tracking-label text-gold uppercase">
                      {cell.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
