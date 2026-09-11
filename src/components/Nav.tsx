"use client";

import { useState } from "react";
import { navLinks } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-panel-border/60 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-2xl tracking-wide text-ink-fg">
          Yard<span className="text-gold">Fame</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="#waitlist" variant="secondary" onClick={() => trackEvent("join_the_yard_click", { placement: "nav" })}>
            Join the Yard
          </Button>
          <Button
            href="#founding-supporters"
            onClick={() => trackEvent("become_a_founding_supporter_click", { placement: "nav" })}
          >
            Become a Founding Supporter
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-panel-border text-ink-fg lg:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-panel-border/60 bg-ink px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink-fg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <Button
              href="#waitlist"
              variant="secondary"
              className="w-full"
              onClick={() => {
                setOpen(false);
                trackEvent("join_the_yard_click", { placement: "mobile_nav" });
              }}
            >
              Join the Yard
            </Button>
            <Button
              href="#founding-supporters"
              className="w-full"
              onClick={() => {
                setOpen(false);
                trackEvent("become_a_founding_supporter_click", { placement: "mobile_nav" });
              }}
            >
              Become a Founding Supporter
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
