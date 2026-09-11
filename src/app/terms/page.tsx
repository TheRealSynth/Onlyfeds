import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { contactEmail } from "@/lib/config";

export const metadata: Metadata = { title: "Terms — YardFame" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        YardFame is currently in pre-launch development. This page is a placeholder and will be replaced with
        complete terms of service before public launch.
      </p>
      <p>
        This site is for informational and validation purposes: describing the planned YardFame platform, building a
        waitlist, and inviting Founding Supporter contributions toward development. It does not yet provide access
        to the full YardFame application, creator monetization, or livestreaming.
      </p>
      <p>
        Founding Supporter contributions fund development of YardFame. They do not represent an investment,
        ownership interest, equity, or guaranteed financial return, and are not tax-deductible charitable
        contributions.
      </p>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${contactEmail}`} className="text-gold">
          {contactEmail}
        </a>
        .
      </p>
    </LegalPage>
  );
}
