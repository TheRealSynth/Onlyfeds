import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { contactEmail } from "@/lib/config";

export const metadata: Metadata = { title: "Contact — YardFame" };

export default function ContactPage() {
  return (
    <LegalPage title="Contact">
      <p>
        For press, partnerships, creator questions, or anything else, reach the YardFame team at{" "}
        <a href={`mailto:${contactEmail}`} className="text-gold">
          {contactEmail}
        </a>
        .
      </p>
      <p>
        Prospective creators and supporters can also use the{" "}
        <Link href="/#waitlist" className="text-gold">
          Join the Yard
        </Link>{" "}
        and{" "}
        <Link href="/#creator-interest" className="text-gold">
          Become a Creator
        </Link>{" "}
        forms on the homepage.
      </p>
    </LegalPage>
  );
}
