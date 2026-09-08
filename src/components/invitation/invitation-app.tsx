"use client";

import { useEffect, useState } from "react";
import { Countdown } from "./countdown";
import { Details } from "./details";
import { Epilogue } from "./epilogue";
import { Grain } from "./grain";
import { Hero } from "./hero";
import { Letter } from "./letter";
import { Program } from "./program";
import { Prologue } from "./prologue";

export function InvitationApp() {
  const [phase, setPhase] = useState<"sealed" | "opening" | "open">("sealed");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setPhase("open");
  }, []);

  useEffect(() => {
    const locked = phase !== "open";
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  function open() {
    if (phase !== "sealed") return;
    setPhase("opening");
    window.setTimeout(() => setPhase("open"), 1500);
  }

  return (
    <main className="bg-night text-cream">
      <Grain />
      {phase !== "open" ? <Prologue opening={phase === "opening"} onOpen={open} /> : null}
      {phase !== "sealed" ? (
        <>
          <Hero />
          <Letter />
          <Countdown />
          <Program />
          <Details />
          <Epilogue />
        </>
      ) : (
        <div className="h-dvh bg-night" aria-hidden />
      )}
    </main>
  );
}
