import { ecosystemItems } from "@/lib/content";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/primitives";

export function Ecosystem() {
  return (
    <Section id="ecosystem" ariaLabel="The YardFame Ecosystem">
      <Container>
        <SectionHeading
          eyebrow="The YardFame Ecosystem"
          title="One platform, built end to end for this community."
          center
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystemItems.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col rounded-2xl border border-panel-border bg-panel p-6 transition-colors hover:border-gold/40"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="font-display text-2xl tracking-wide text-ink-fg">{item.name}</h3>
                <Badge tone={item.tag === "In Development" ? "gold" : "muted"}>{item.tag}</Badge>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{item.summary}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
