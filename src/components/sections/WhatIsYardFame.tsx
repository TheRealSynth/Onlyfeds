import { Container, Section, SectionHeading } from "@/components/ui/primitives";

const capabilities = [
  "Build audiences",
  "Publish content",
  "Interact with supporters",
  "Create entertainment",
  "Receive support",
  "Monetize an audience",
  "Maintain identity across major life transitions",
];

export function WhatIsYardFame() {
  return (
    <Section id="about" ariaLabel="What is YardFame">
      <Container>
        <SectionHeading
          eyebrow="What is YardFame?"
          title="A creator ecosystem built for a community other platforms overlook."
          description="YardFame is being built as a purpose-built creator ecosystem where overlooked personalities can grow — not a generic creator platform with a theme applied to it."
        />
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {capabilities.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-panel-border bg-panel/60 px-4 py-3.5 text-sm text-ink-fg"
            >
              <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
