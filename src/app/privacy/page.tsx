import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { contactEmail } from "@/lib/config";

export const metadata: Metadata = { title: "Privacy — YardFame" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        YardFame is currently in pre-launch development. This page is a placeholder outlining our intended approach
        to privacy and will be replaced with a complete policy before public launch.
      </p>
      <p>
        Information submitted through the waitlist or creator interest forms on this site (name, email, role, and any
        optional details you provide) is used only to contact you about YardFame&apos;s development and launch. It is
        not sold or shared with third parties for marketing purposes.
      </p>
      <p>
        Questions about this policy or a request to remove your information can be sent to{" "}
        <a href={`mailto:${contactEmail}`} className="text-gold">
          {contactEmail}
        </a>
        .
      </p>
    </LegalPage>
  );
}
