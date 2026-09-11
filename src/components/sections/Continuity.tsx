import { continuityStages } from "@/lib/content";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";

export function Continuity() {
  return (
    <Section className="border-y border-panel-border/60 bg-panel/40">
      <Container>
        <SectionHeading
          eyebrow="Creator Continuity"
          title="Your audience should come home with you."
          description="YardFame is intended to let a creator carry their profile, followers, content, and supporter relationships across every stage — instead of rebuilding an audience from zero after release."
          center
        />

        <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {continuityStages.map((stage, i) => (
            <li key={stage.id} className="relative flex flex-col gap-3 rounded-2xl border border-panel-border bg-ink/60 p-6">
              <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-xl tracking-wide text-ink-fg">{stage.name}</h3>
              <p className="text-sm leading-relaxed text-ink-muted">{stage.description}</p>
              {i < continuityStages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 text-gold/50 sm:block"
                >
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
