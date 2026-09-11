import { roadmapPhases } from "@/lib/content";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/primitives";

const statusTone = {
  Completed: "gold",
  "In Progress": "gold",
  Planned: "muted",
} as const;

export function Roadmap() {
  return (
    <Section id="roadmap" ariaLabel="Roadmap">
      <Container>
        <SectionHeading eyebrow="Roadmap" title="Where YardFame is headed." center />
        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roadmapPhases.map((phase) => (
            <li key={phase.phase} className="flex flex-col rounded-2xl border border-panel-border bg-panel p-6">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{phase.phase}</span>
                <Badge tone={statusTone[phase.status]}>{phase.status}</Badge>
              </div>
              <h3 className="font-display text-2xl tracking-wide text-ink-fg">{phase.title}</h3>
              <ul className="mt-3 flex flex-col gap-1.5">
                {phase.goals.map((goal) => (
                  <li key={goal} className="text-sm leading-relaxed text-ink-muted">
                    · {goal}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
