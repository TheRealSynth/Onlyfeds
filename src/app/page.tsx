import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatIsYardFame } from "@/components/sections/WhatIsYardFame";
import { Problem } from "@/components/sections/Problem";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Continuity } from "@/components/sections/Continuity";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ForCreatorsAndSupporters } from "@/components/sections/ForCreatorsAndSupporters";
import { FoundingSupporters } from "@/components/sections/FoundingSupporters";
import { Roadmap } from "@/components/sections/Roadmap";
import { BuildInPublic } from "@/components/sections/BuildInPublic";
import { Waitlist } from "@/components/sections/Waitlist";
import { CreatorInterest } from "@/components/sections/CreatorInterest";
import { Faq } from "@/components/sections/Faq";
import { Share } from "@/components/sections/Share";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatIsYardFame />
        <Problem />
        <Ecosystem />
        <Continuity />
        <HowItWorks />
        <ForCreatorsAndSupporters />
        <FoundingSupporters />
        <Roadmap />
        <BuildInPublic />
        <Waitlist />
        <CreatorInterest />
        <Faq />
        <Share />
      </main>
      <Footer />
    </>
  );
}
