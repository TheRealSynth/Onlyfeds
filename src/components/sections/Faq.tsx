import { faqItems } from "@/lib/content";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";

export function Faq() {
  return (
    <Section id="faq" ariaLabel="Frequently asked questions">
      <Container>
        <SectionHeading eyebrow="FAQ" title="Questions, answered." center />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-panel-border rounded-2xl border border-panel-border bg-panel">
          {faqItems.map((item) => (
            <details key={item.question} className="group px-5 py-4 sm:px-7">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1.5 text-left text-base font-medium text-ink-fg marker:content-none">
                {item.question}
                <span aria-hidden="true" className="shrink-0 text-gold transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 pb-1 text-sm leading-relaxed text-ink-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
