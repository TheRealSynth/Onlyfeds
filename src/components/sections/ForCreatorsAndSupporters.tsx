"use client";

import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { trackEvent } from "@/lib/analytics";

const creatorBenefits = [
  "Establish a creator identity",
  "Build an audience",
  "Publish content",
  "Livestream where permitted",
  "Receive virtual gifts",
  "Offer subscriptions",
  "Interact with supporters",
  "Track followers and engagement",
  "Track earnings",
  "Maintain audience continuity across stages",
];

const supporterBenefits = [
  "Discover creators",
  "Follow personalities",
  "Watch content",
  "Interact directly",
  "Join Lives",
  "Send virtual gifts",
  "Subscribe to creators",
  "Participate in Yard Battles",
  "Follow a creator's journey",
  "Discover emerging personalities early",
];

export function ForCreatorsAndSupporters() {
  return (
    <Section id="creators" ariaLabel="For creators and supporters" className="border-y border-panel-border/60 bg-panel/40">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-panel-border bg-ink/60 p-7 sm:p-9">
            <SectionHeading eyebrow="For Creators" title="Build here. Keep it through every stage." />
            <ul className="mt-6 flex flex-col gap-2.5">
              {creatorBenefits.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              href="#creator-interest"
              className="mt-7"
              onClick={() => trackEvent("become_a_creator_click", { placement: "for_creators" })}
            >
              Become a Creator
            </Button>
          </div>

          <div className="rounded-2xl border border-panel-border bg-ink/60 p-7 sm:p-9">
            <SectionHeading eyebrow="For Supporters" title="Discover and back the next generation of creators." />
            <ul className="mt-6 flex flex-col gap-2.5">
              {supporterBenefits.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              href="#waitlist"
              variant="secondary"
              className="mt-7"
              onClick={() => trackEvent("join_the_yard_click", { placement: "for_supporters" })}
            >
              Join the Yard
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
