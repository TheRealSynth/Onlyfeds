"use client";

import { useState } from "react";
import { contributionTiers, supportAreas } from "@/lib/content";
import { isPaypalConfigured, paypalSupportUrl } from "@/lib/config";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { trackEvent } from "@/lib/analytics";

export function FoundingSupporters() {
  const [selected, setSelected] = useState<number | "custom" | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  function selectAmount(amount: number | "custom") {
    setSelected(amount);
    trackEvent("contribution_amount_selected", { amount });
  }

  function handleContribute() {
    trackEvent("become_a_founding_supporter_click", { placement: "founding_supporters", selected });
    if (isPaypalConfigured) {
      trackEvent("paypal_outbound_click", { selected });
      window.open(paypalSupportUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <Section id="founding-supporters" ariaLabel="Founding Supporters" className="border-y border-panel-border/60 bg-panel/40">
      <Container>
        <SectionHeading
          eyebrow="Founding Supporters"
          title="Help Build YardFame"
          description="Become a Founding Supporter and help bring a new creator ecosystem to life. Early contributions help fund the product, infrastructure, and safety systems needed to launch responsibly."
          center
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contributionTiers.map((tier) => (
            <button
              key={tier.amount}
              type="button"
              onClick={() => selectAmount(tier.amount)}
              aria-pressed={selected === tier.amount}
              className={`rounded-2xl border p-6 text-left transition-colors ${
                selected === tier.amount
                  ? "border-gold bg-gold/10"
                  : "border-panel-border bg-ink/60 hover:border-white/20"
              }`}
            >
              <p className="font-display text-3xl tracking-wide text-ink-fg">${tier.amount}</p>
              <p className="mt-1 text-sm text-ink-muted">{tier.label}</p>
            </button>
          ))}

          <div
            className={`rounded-2xl border p-6 text-left transition-colors ${
              selected === "custom" ? "border-gold bg-gold/10" : "border-panel-border bg-ink/60"
            }`}
          >
            <label htmlFor="custom-amount" className="font-display text-xl tracking-wide text-ink-fg">
              Custom Amount
            </label>
            <div className="mt-2 flex items-center gap-1 rounded-lg border border-panel-border bg-ink px-3 py-2">
              <span className="text-ink-muted">$</span>
              <input
                id="custom-amount"
                inputMode="decimal"
                placeholder="0"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  selectAmount("custom");
                }}
                className="w-full bg-transparent text-ink-fg outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <button
            type="button"
            onClick={handleContribute}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-ink transition-all hover:bg-gold-bright"
          >
            Become a Founding Supporter
          </button>
          {!isPaypalConfigured && (
            <p className="max-w-md text-xs text-ink-muted">
              Supporter checkout is being finalized. PayPal contributions will open here shortly.
            </p>
          )}
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-ink-muted">
            What support helps build
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {supportAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-panel-border bg-ink/60 px-3.5 py-1.5 text-xs text-ink-muted"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-ink-muted/70">
          Founding Supporter contributions help fund development of YardFame. Contributions do not represent an
          investment, ownership interest, equity, or guaranteed financial return and are not represented as
          tax-deductible charitable contributions.
        </p>
      </Container>
    </Section>
  );
}
