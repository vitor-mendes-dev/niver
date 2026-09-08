import { event } from "@/lib/event";
import { GoldRule } from "./ornament";
import { Reveal } from "./reveal";
import { assetPath } from "@/lib/utils";

export function Epilogue() {
  return (
    <section className="relative isolate flex min-h-[70dvh] items-center justify-center overflow-hidden bg-night px-6 py-28">
      <video
        className="absolute inset-0 hidden size-full object-cover md:block"
        autoPlay
        muted
        loop
        playsInline
        poster={assetPath("/images/night.jpg")}
        aria-hidden
      >
        <source src={assetPath("/videos/night.mp4")} type="video/mp4" />
      </video>
      <img
        src={assetPath("/images/night.jpg")}
        alt=""
        className="absolute inset-0 size-full object-cover md:hidden"
      />
      <div className="absolute inset-0 bg-night/55" />
      <div className="vignette absolute inset-0" />

      <Reveal className="relative z-10 max-w-lg text-center">
        <p className="font-display text-3xl text-cream italic md:text-4xl">
          Sua presença fará parte dessa história.
        </p>
        <GoldRule className="my-8" />
        <p className="font-label text-xs tracking-label text-gold uppercase">
          Te esperamos
        </p>
        <p className="mt-8 font-display text-lg text-cream-muted">
          {event.honoree}
          <span className="mx-3 text-gold">·</span>
          {event.dateLabel}
        </p>
      </Reveal>
    </section>
  );
}
