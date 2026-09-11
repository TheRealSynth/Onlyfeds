"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { trackEvent } from "@/lib/analytics";

export function Share() {
  const [copied, setCopied] = useState(false);
  const shareText = `${siteConfig.name} — ${siteConfig.tagline}`;

  async function share(channel: string) {
    trackEvent("share_click", { channel });
    const url = siteConfig.url;

    if (channel === "native" && typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: siteConfig.name, text: shareText, url });
      } catch {
        // user cancelled — no-op
      }
      return;
    }

    if (channel === "copy") {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard unavailable — no-op
      }
      return;
    }

    const links: Record<string, string> = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      sms: `sms:?&body=${encodeURIComponent(`${shareText} ${url}`)}`,
      email: `mailto:?subject=${encodeURIComponent(siteConfig.name)}&body=${encodeURIComponent(`${shareText}\n\n${url}`)}`,
    };
    if (links[channel]) window.open(links[channel], "_blank", "noopener,noreferrer");
  }

  return (
    <Section className="border-y border-panel-border/60 bg-panel/40">
      <Container>
        <SectionHeading eyebrow="Spread the Word" title="Know someone who belongs on the Yard?" center />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ShareButton label="Copy link" onClick={() => share("copy")} active={copied} />
          <ShareButton label="X" onClick={() => share("x")} />
          <ShareButton label="Facebook" onClick={() => share("facebook")} />
          <ShareButton label="Text" onClick={() => share("sms")} />
          <ShareButton label="Email" onClick={() => share("email")} />
        </div>
      </Container>
    </Section>
  );
}

function ShareButton({ label, onClick, active }: { label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
        active ? "border-gold bg-gold/10 text-gold" : "border-panel-border bg-ink/60 text-ink-fg hover:border-white/20"
      }`}
    >
      {active ? "Copied!" : label}
    </button>
  );
}
