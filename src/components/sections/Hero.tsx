"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/primitives";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-panel-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(232,177,77,0.16),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div className="mb-6 flex justify-center">
          <Badge>Currently in Development</Badge>
        </div>

        <h1 className="mx-auto max-w-4xl text-balance text-center font-display text-5xl leading-[1.02] tracking-wide text-ink-fg sm:text-7xl">
          Fame Doesn&apos;t Stop <span className="text-gold">at the Fence.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-center text-lg leading-relaxed text-ink-muted sm:text-xl">
          YardFame is building a creator platform connecting incarcerated, formerly incarcerated, and
          Free World creators with the communities that support them.
        </p>

        <div className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Button
            href="#founding-supporters"
            onClick={() => trackEvent("become_a_founding_supporter_click", { placement: "hero" })}
          >
            Become a Founding Supporter
          </Button>
          <Button
            href="#waitlist"
            variant="secondary"
            onClick={() => trackEvent("join_the_yard_click", { placement: "hero" })}
          >
            Join the Yard
          </Button>
          <Button
            href="#creator-interest"
            variant="ghost"
            onClick={() => trackEvent("become_a_creator_click", { placement: "hero" })}
          >
            Become a Creator
          </Button>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto mt-16 max-w-4xl">
      <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
        <Badge tone="muted">Product Preview — Concept Only</Badge>
      </div>
      <div className="rounded-2xl border border-panel-border bg-panel p-2 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] sm:p-3">
        <div className="rounded-xl border border-panel-border/80 bg-ink p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-panel-border/60 pb-3">
            <span className="font-display text-lg tracking-wide text-ink-fg">The Yard</span>
            <div className="flex gap-2">
              <span className="h-2 w-2 rounded-full bg-crimson/70" />
              <span className="h-2 w-2 rounded-full bg-gold/70" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["Live now: Yard Battle", "Trending: New Creator Story", "Commissary: Gift Sent"].map((label) => (
              <div key={label} className="rounded-lg border border-panel-border/70 bg-white/[0.03] p-4">
                <div className="h-20 rounded-md bg-gradient-to-br from-white/10 to-white/0" />
                <p className="mt-3 text-xs font-medium text-ink-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
