import { ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  className = "",
  children,
  ariaLabel,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <section id={id} aria-label={ariaLabel} className={`relative py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-balance font-display text-4xl leading-[1.05] tracking-wide text-ink-fg sm:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{description}</p>}
    </div>
  );
}

export function Badge({ tone = "gold", children }: { tone?: "gold" | "muted"; children: ReactNode }) {
  const tones = {
    gold: "border-gold/40 bg-gold/10 text-gold",
    muted: "border-panel-border bg-white/5 text-ink-muted",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
