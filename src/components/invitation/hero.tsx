import { ChevronDown } from "lucide-react";
import { event } from "@/lib/event";
import { Fireflies } from "./fireflies";
import { GoldRule } from "./ornament";

export function Hero() {
  return (
    <section className="relative isolate h-dvh min-h-dvh overflow-hidden bg-night letterbox">
      <video
        className="absolute inset-0 hidden size-full object-cover md:block"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero.jpg"
        aria-hidden
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <img
        src="/images/hero-portrait.jpg"
        alt=""
        className="ken-burns absolute inset-0 size-full object-cover md:hidden"
      />
      <div className="vignette absolute inset-0 z-10" />
      <Fireflies />

      <div className="hero-copy relative z-30 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-5 font-label text-xs tracking-label text-gold-bright uppercase">
          {event.dateLabel}
        </p>
        <h1 className="max-w-4xl font-display text-hero font-medium tracking-title text-cream uppercase">
          {event.title}
        </h1>
        <GoldRule className="my-6" />
        <p className="max-w-md font-display text-2xl text-cream italic sm:text-3xl">
          {event.subtitle}
        </p>
        <p className="mt-4 max-w-sm font-display text-base text-cream-muted">
          {event.tagline}
        </p>
      </div>

      <a
        href="#convite"
        className="absolute bottom-10 left-1/2 z-30 flex min-h-11 -translate-x-1/2 flex-col items-center gap-2 font-label text-xs tracking-label text-gold uppercase motion-reduce:animate-none"
      >
        Deslize
        <ChevronDown className="size-4 animate-bounce motion-reduce:animate-none" strokeWidth={1.25} />
      </a>
    </section>
  );
}
