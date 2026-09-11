"use client";

import { FormEvent, useState } from "react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { trackEvent } from "@/lib/analytics";

const ROLES = ["Creator", "Supporter / Fan", "Creator Manager", "Family Member", "Potential Partner", "Media", "Other"];

export function Waitlist() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      role: String(form.get("role") || ""),
      message: String(form.get("message") || ""),
    };

    if (!payload.name || !payload.email || !payload.role) {
      setError("Name, email, and role are required.");
      return;
    }

    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
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
      trackEvent("waitlist_submitted", { role: payload.role });
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <Section id="waitlist" ariaLabel="Join the waitlist" className="border-y border-panel-border/60 bg-panel/40">
      <Container>
        <div className="mx-auto max-w-xl">
          <SectionHeading eyebrow="Join the Yard" title="Get on the list." center />

          {status === "success" ? (
            <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-8 text-center">
              <p className="font-display text-2xl tracking-wide text-ink-fg">You&apos;re on the Yard.</p>
              <p className="mt-2 text-sm text-ink-muted">
                We&apos;ll reach out as YardFame moves toward alpha. Thanks for being early.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4" noValidate>
              <div>
                <label htmlFor="wl-name" className="mb-1.5 block text-sm font-medium text-ink-fg">
                  Name
                </label>
                <input
                  id="wl-name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="wl-email" className="mb-1.5 block text-sm font-medium text-ink-fg">
                  Email
                </label>
                <input
                  id="wl-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                />
              </div>
              <div>
                <label htmlFor="wl-role" className="mb-1.5 block text-sm font-medium text-ink-fg">
                  I am a...
                </label>
                <select
                  id="wl-role"
                  name="role"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="wl-message" className="mb-1.5 block text-sm font-medium text-ink-fg">
                  Why are you interested? <span className="text-ink-muted">(optional)</span>
                </label>
                <textarea
                  id="wl-message"
                  name="message"
                  rows={3}
                  className="w-full rounded-lg border border-panel-border bg-ink px-4 py-3 text-ink-fg outline-none focus:border-gold"
                />
              </div>

              {error && <p className="text-sm text-crimson">{error}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-ink transition-all hover:bg-gold-bright disabled:opacity-60"
              >
                {status === "submitting" ? "Joining..." : "Join the Yard"}
              </button>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
