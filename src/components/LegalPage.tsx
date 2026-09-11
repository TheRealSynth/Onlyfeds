import { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/primitives";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>
        <Section>
          <Container className="max-w-3xl">
            <h1 className="font-display text-4xl tracking-wide text-ink-fg">{title}</h1>
            <div className="prose-invert mt-8 flex flex-col gap-4 text-sm leading-relaxed text-ink-muted">
              {children}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
