import { Container, Section, SectionHeading } from "@/components/ui/primitives";

const assumptions = [
  "Unrestricted internet access",
  "Normal creator workflows",
  "Stable identity and account access",
  "Standard payment access",
  "Normal livestream access",
  "Direct account ownership",
  "No major transition between confinement and release",
];

export function Problem() {
  return (
    <Section className="border-y border-panel-border/60 bg-panel/40">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="The Problem"
            title="Traditional creator platforms weren't built for this community."
            description="Most platforms quietly assume a set of conditions that don't hold for incarcerated and formerly incarcerated creators. YardFame is being built around the circumstances those platforms don't handle well."
          />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {assumptions.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-panel-border bg-ink/60 px-4 py-3.5 text-sm text-ink-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
