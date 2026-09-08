import { cn } from "@/lib/utils";

export function GoldRule({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden
    >
      <span className="h-px w-10 bg-gold/55" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-gold/55" />
    </div>
  );
}

export function SectionKicker({ children }: { children: string }) {
  return (
    <p className="font-label text-xs tracking-label text-gold uppercase">
      {children}
    </p>
  );
}
