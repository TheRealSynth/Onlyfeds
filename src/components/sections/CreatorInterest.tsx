"use client";

import { FormEvent, useState } from "react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { trackEvent } from "@/lib/analytics";

const STAGES = ["Fed Baby", "State Baby", "Coming Home", "Touched Down", "Free World", "Manager / Family Applying for Creator"];

export function CreatorInterest() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      stage: String(form.get("stage") || ""),
      alias: String(form.get("alias") || ""),
      managedBy: String(form.get("managedBy") || ""),
      background: String(form.get("background") || ""),
      contentType: String(form.get("contentType") || ""),
      socialLinks: String(form.get("socialLinks") || ""),
    };

    if (!payload.name || !payload.email || !payload.stage) {
      setError("Name, email, and creator stage are required.");
      return;
    }

    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/creator-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      trackEvent("creator_form_submitted", { stage: payload.stage });
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <Section id="creator-interest" ariaLabel="Become a creator" className="border-y border-panel-border/60 bg-panel/40">
      <Container>
        <div className="mx-auto max-w-xl">
          <SectionHeading eyebrow="Become a Creator" title="Tell us about you." center />

          {status === "success" ? (
            <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-8 text-center">
              <p className="font-display text-2xl tracking-wide text-ink-fg">Received.</p>
              <p className="mt-2 text-sm text-ink-muted">
                We&apos;ll follow up as creator onboarding opens for your stage.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4" noValidate>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ci-name" className="mb-1.5 block text-sm font-medium text-ink-fg">
                    Name
                  </label>
                  <input
                    id="ci-name"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label htmlFor="ci-email" className="mb-1.5 block text-sm font-medium text-ink-fg">
                    Email
                  </label>
                  <input
                    id="ci-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ci-stage" className="mb-1.5 block text-sm font-medium text-ink-fg">
                  Creator stage
                </label>
                <select
                  id="ci-stage"
                  name="stage"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {STAGES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ci-alias" className="mb-1.5 block text-sm font-medium text-ink-fg">
                    Creator name / alias <span className="text-ink-muted">(optional)</span>
                  </label>
                  <input
                    id="ci-alias"
                    name="alias"
                    className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label htmlFor="ci-managed" className="mb-1.5 block text-sm font-medium text-ink-fg">
                    Managed by <span className="text-ink-muted">(optional)</span>
                  </label>
                  <input
                    id="ci-managed"
                    name="managedBy"
                    placeholder="Family member, manager, self"
                    className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ci-content" className="mb-1.5 block text-sm font-medium text-ink-fg">
                  Type of content you want to create <span className="text-ink-muted">(optional)</span>
                </label>
                <input
                  id="ci-content"
                  name="contentType"
                  className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                />
              </div>

              <div>
                <label htmlFor="ci-background" className="mb-1.5 block text-sm font-medium text-ink-fg">
                  Brief background <span className="text-ink-muted">(optional)</span>
                </label>
                <textarea
                  id="ci-background"
                  name="background"
                  rows={3}
                  className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                />
              </div>

              <div>
                <label htmlFor="ci-social" className="mb-1.5 block text-sm font-medium text-ink-fg">
                  Social links <span className="text-ink-muted">(optional)</span>
                </label>
                <input
                  id="ci-social"
                  name="socialLinks"
                  className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                />
              </div>

              {error && <p className="text-sm text-crimson">{error}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-ink transition-all hover:bg-gold-bright disabled:opacity-60"
              >
                {status === "submitting" ? "Submitting..." : "Submit Creator Interest"}
              </button>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
