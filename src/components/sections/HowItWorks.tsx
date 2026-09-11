import { Container, Section, SectionHeading } from "@/components/ui/primitives";

const steps = ["Discover", "Follow", "Watch", "Interact", "Support", "Grow Together"];

export function HowItWorks() {
  return (
    <Section ariaLabel="How it works">
      <Container>
        <SectionHeading eyebrow="How It Works" title="From discovery to community, in six steps." center />
        <ol className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="flex items-center gap-3 rounded-full border border-panel-border bg-panel px-5 py-3 text-sm font-semibold tracking-wide text-ink-fg">
                <span className="text-gold">{i + 1}</span>
                {step}
              </span>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="hidden text-ink-muted sm:inline">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
