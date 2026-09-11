import Link from "next/link";
import { contactEmail } from "@/lib/config";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "YardFame",
    links: [
      { label: "About", href: "#about" },
      { label: "Creators", href: "#creators" },
      { label: "Founding Supporters", href: "#founding-supporters" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-panel-border/60 bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl tracking-wide text-ink-fg">
              Yard<span className="text-gold">Fame</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">Fame doesn&apos;t stop at the fence.</p>
            <a href={`mailto:${contactEmail}`} className="mt-3 inline-block text-sm text-ink-muted hover:text-ink-fg">
              {contactEmail}
            </a>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{col.title}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-fg/80 hover:text-ink-fg">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-panel-border/60 pt-6">
          <p className="text-xs leading-relaxed text-ink-muted">
            YardFame is currently under development. Planned features, economics, pricing, and functionality may
            change prior to launch.
          </p>
          <p className="mt-3 text-xs text-ink-muted/60">
            © {new Date().getFullYear()} YardFame. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
