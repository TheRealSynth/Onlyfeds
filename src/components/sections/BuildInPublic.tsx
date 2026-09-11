import { Container, Section, SectionHeading } from "@/components/ui/primitives";

const milestones = [
  { label: "Brand & product concept defined", done: true },
  { label: "Pre-launch site live", done: true },
  { label: "Waitlist & creator interest pipeline open", done: true },
  { label: "Founding Supporter program launched", done: true },
  { label: "Closed alpha creator group invited", done: false },
  { label: "Livestreaming infrastructure in testing", done: false },
];

export function BuildInPublic() {
  return (
    <Section className="border-y border-panel-border/60 bg-panel/40">
      <Container>
        <SectionHeading
          eyebrow="Build in Public"
          title="Development, out in the open."
          description="We'll share milestones, previews, and progress here as YardFame is built — no fabricated stats, just what's actually shipped."
          center
        />
        <ul className="mx-auto mt-10 flex max-w-xl flex-col gap-2.5">
          {milestones.map((m) => (
            <li
              key={m.label}
              className="flex items-center gap-3 rounded-xl border border-panel-border bg-ink/60 px-4 py-3.5 text-sm"
            >
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${
                  m.done ? "bg-gold text-ink" : "border border-panel-border text-ink-muted"
                }`}
              >
                {m.done ? "✓" : ""}
              </span>
              <span className={m.done ? "text-ink-fg" : "text-ink-muted"}>{m.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
