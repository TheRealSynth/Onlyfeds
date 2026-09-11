export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#ecosystem" },
  { label: "Creators", href: "#creators" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
  { label: "Founding Supporters", href: "#founding-supporters" },
];

export type EcosystemItem = {
  id: string;
  name: string;
  tag: "Planned" | "In Development";
  summary: string;
};

export const ecosystemItems: EcosystemItem[] = [
  {
    id: "the-yard",
    name: "The Yard",
    tag: "In Development",
    summary:
      "The main discovery feed — posts, clips, creator updates, trending personalities, and community activity in one place.",
  },
  {
    id: "live",
    name: "Live",
    tag: "Planned",
    summary:
      "Real-time livestreaming and interaction, built for wherever it's technically and legally permitted.",
  },
  {
    id: "creator-profiles",
    name: "Creator Profiles",
    tag: "In Development",
    summary:
      "Profiles built around a creator's story, content, audience, supporter activity, milestones, and current stage.",
  },
  {
    id: "stamps",
    name: "Stamps",
    tag: "Planned",
    summary:
      "YardFame's planned virtual currency. Current concept: 100 Stamps ≈ $1 of represented gift value. Not purchasable yet.",
  },
  {
    id: "commissary",
    name: "Commissary",
    tag: "Planned",
    summary:
      "Virtual supporter gifts creators can receive from their community. Digital items only.",
  },
  {
    id: "contraband",
    name: "Contraband",
    tag: "Planned",
    summary:
      "A culturally branded category of virtual novelty gifts — entertainment items only, never physical or prohibited goods.",
  },
  {
    id: "books",
    name: "Books",
    tag: "Planned",
    summary:
      "Creator earnings. Current planned split is roughly 70% creator / 30% YardFame, subject to change before launch.",
  },
  {
    id: "kites",
    name: "Kites",
    tag: "Planned",
    summary: "Planned messaging and community communication between creators and supporters.",
  },
  {
    id: "mail-call",
    name: "Mail Call",
    tag: "Planned",
    summary: "Notifications, supporter activity, and important account and community updates.",
  },
  {
    id: "yard-battles",
    name: "Yard Battles",
    tag: "Planned",
    summary:
      "Creator-versus-creator entertainment events with live audience participation, gifting, and rankings.",
  },
  {
    id: "the-list",
    name: "The List",
    tag: "Planned",
    summary:
      "Planned supporter subscriptions. Early concept pricing: $4.99 / $9.99 / $19.99, subject to change.",
  },
  {
    id: "my-spot",
    name: "My Spot",
    tag: "Planned",
    summary:
      "The creator dashboard concept — content, followers, earnings, analytics, subscriptions, and supporter activity in one view.",
  },
];

export type ContinuityStage = {
  id: string;
  name: string;
  description: string;
};

export const continuityStages: ContinuityStage[] = [
  {
    id: "fed-baby",
    name: "Fed Baby / State Baby",
    description: "A creator builds identity, content, and community from inside.",
  },
  {
    id: "coming-home",
    name: "Coming Home",
    description: "Release approaches. The audience and profile stay intact.",
  },
  {
    id: "touched-down",
    name: "Touched Down",
    description: "Back in the Free World, picking up exactly where they left off.",
  },
  {
    id: "free-world",
    name: "Free World",
    description: "A fully independent creator, still carrying the audience they built.",
  },
];

export type RoadmapPhase = {
  phase: string;
  title: string;
  status: "Completed" | "In Progress" | "Planned";
  goals: string[];
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "Vision + Prototype",
    status: "In Progress",
    goals: ["Product concept and brand definition", "Pre-launch site and waitlist", "Founding Supporter program"],
  },
  {
    phase: "Phase 2",
    title: "Platform Foundation",
    status: "In Progress",
    goals: ["Core account and profile infrastructure", "The Yard feed foundation", "Creator interest pipeline"],
  },
  {
    phase: "Phase 3",
    title: "Closed Alpha",
    status: "Planned",
    goals: ["Invite an initial group of creators", "Invite a limited group of testers", "Gather structured feedback"],
  },
  {
    phase: "Phase 4",
    title: "Creator Economy",
    status: "Planned",
    goals: ["Stamps, Books, and Commissary", "Subscriptions (The List)", "Payments and payout infrastructure"],
  },
  {
    phase: "Phase 5",
    title: "Live Platform",
    status: "Planned",
    goals: ["Production livestreaming", "Yard Battles", "Real-time interaction at scale"],
  },
  {
    phase: "Phase 6",
    title: "Public Launch",
    status: "Planned",
    goals: ["General availability", "Full creator continuity across stages", "Ongoing safety and moderation scaling"],
  },
];

export type ContributionTier = {
  amount: number;
  label: string;
};

export const contributionTiers: ContributionTier[] = [
  { amount: 10, label: "Support the Vision" },
  { amount: 25, label: "Help Build the Yard" },
  { amount: 50, label: "Day One Supporter" },
  { amount: 100, label: "Founding Supporter" },
  { amount: 250, label: "Founding Circle" },
];

export const supportAreas: string[] = [
  "Engineering",
  "Mobile experience",
  "Infrastructure & hosting",
  "Livestreaming infrastructure",
  "Trust & safety, moderation",
  "Creator onboarding",
  "Payments & payout infrastructure",
  "Alpha testing",
  "Launch operations",
];

export type FaqItem = { question: string; answer: string };

export const faqItems: FaqItem[] = [
  {
    question: "What is YardFame?",
    answer:
      "YardFame is a creator, entertainment, and community platform being built for incarcerated, formerly incarcerated, and Free World creators, and the supporters who back them.",
  },
  {
    question: "Is YardFame live yet?",
    answer:
      "Not yet. YardFame is currently in development. This site is a pre-launch experience for building the waitlist, recruiting creators, and validating demand.",
  },
  {
    question: "Who is YardFame for?",
    answer:
      "Creators at any stage — incarcerated, formerly incarcerated, or Free World — along with their families, managers, and the supporters and fans who follow them.",
  },
  {
    question: "Can incarcerated creators participate?",
    answer:
      "Yes, through lawful and authorized methods — approved communications, prerecorded or submitted content, and family- or manager-operated profiles where appropriate.",
  },
  {
    question: "How will creators participate while incarcerated?",
    answer:
      "Content is submitted or managed through permitted channels, such as approved communication systems or a family member or manager operating the profile on the creator's behalf.",
  },
  {
    question: "How will YardFame stay compliant with institutional rules?",
    answer:
      "YardFame is designed around lawful, authorized participation only. It does not facilitate contraband devices, unauthorized communications, or bypassing institutional restrictions.",
  },
  {
    question: "What are Stamps?",
    answer:
      "Stamps are YardFame's planned virtual currency. The current concept is 100 Stamps ≈ $1 of represented gift value. Stamps are not purchasable on this site — this is a planned feature.",
  },
  {
    question: "What is Commissary?",
    answer: "Commissary is the planned catalog of virtual supporter gifts creators can receive. All items are digital.",
  },
  {
    question: "What are Books?",
    answer:
      "Books refers to creator earnings. The current planned split is approximately 70% creator / 30% YardFame — subject to change before launch.",
  },
  {
    question: "What is Contraband?",
    answer:
      "Contraband is a culturally branded category of virtual novelty gifts only. It does not refer to, and YardFame does not offer, any physical or prohibited items.",
  },
  {
    question: "How will creators make money?",
    answer:
      "Through planned mechanisms including virtual gifts (Commissary), subscriptions (The List), and other monetization tools built directly into creator profiles.",
  },
  {
    question: "What percentage will creators receive?",
    answer: "The current planned model is approximately 70% creator / 30% YardFame. This is subject to change prior to launch.",
  },
  {
    question: "What happens when a creator is released?",
    answer:
      "Their profile, audience, content, and supporter relationships are designed to move with them — no rebuilding an audience from zero.",
  },
  {
    question: "What does becoming a Founding Supporter mean?",
    answer:
      "It means contributing early to help fund development of YardFame, and being recognized as part of the founding community that helped build it.",
  },
  {
    question: "Is this an investment?",
    answer: "No. Founding Supporter contributions are not an investment and do not promise any financial return.",
  },
  {
    question: "Do I receive equity?",
    answer: "No. Contributions do not represent equity or an ownership interest in YardFame.",
  },
  {
    question: "Are contributions tax deductible?",
    answer:
      "No. YardFame is not a charity, and Founding Supporter contributions are not represented as tax-deductible charitable contributions.",
  },
  {
    question: "What does supporter funding help pay for?",
    answer:
      "Product development, infrastructure, hosting, livestream systems, moderation and safety systems, creator onboarding, payments infrastructure, alpha testing, and launch operations.",
  },
  {
    question: "When will YardFame launch?",
    answer: "There is no launch date yet. Progress will be shared as development continues.",
  },
  {
    question: "How do I become an early tester?",
    answer: "Join the Yard through the waitlist above and select the role that best fits you.",
  },
  {
    question: "How do I become a creator?",
    answer: "Use the Become a Creator form to submit your interest and creator stage.",
  },
  {
    question: "Can a family member or manager help run a creator profile?",
    answer:
      "Yes. This is part of the planned compliant participation model for creators who cannot directly operate an account themselves.",
  },
];
