export interface Project {
  slug: string;
  name: string;
  category: "Web" | "Mobile" | "Branding";
  year: string;
  client: string;
  techStack: string[];
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  /** CSS gradient for the placeholder hero/cover image. */
  gradient: string;
  /** Relative vertical height class for masonry variety. */
  height: string;
  gallery: { gradient: string; caption: string }[];
}

export const projects: Project[] = [
  {
    slug: "aurum-finance",
    name: "Aurum Finance",
    category: "Web",
    year: "2024",
    client: "Aurum Capital",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Framer Motion"],
    tagline: "Wealth management, redefined.",
    description:
      "A premium fintech platform for high-net-worth portfolio management with real-time analytics and a sleek, institutional-grade dashboard.",
    problem:
      "Aurum's legacy platform was slow, dated, and failed to convey the sophistication their clientele expected. Onboarding took 47 minutes on average.",
    solution:
      "We rebuilt the entire platform on Next.js with a real-time data pipeline, reducing onboarding to under 6 minutes and delivering a buttery 60fps dashboard.",
    outcome:
      "Revenue up 340% in six months. Average session duration tripled. Client satisfaction at 99%.",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #c9a84c 100%)",
    height: "h-72",
    gallery: [
      { gradient: "linear-gradient(135deg, #1a1a2e, #c9a84c)", caption: "Dashboard overview" },
      { gradient: "linear-gradient(135deg, #0f0f0f, #8b6914)", caption: "Portfolio analytics" },
      { gradient: "linear-gradient(135deg, #16213e, #c9a84c)", caption: "Mobile experience" },
    ],
  },
  {
    slug: "vela-apparel",
    name: "Vela Apparel",
    category: "Branding",
    year: "2023",
    client: "Vela Fashion House",
    techStack: ["Webflow", "TypeScript", "GSAP", "Figma"],
    tagline: "Sustainable luxury, made visible.",
    description:
      "A complete brand identity and storefront for a sustainable fashion label, from logo system to a headless e-commerce experience.",
    problem:
      "Vela had no coherent brand system and a fragmented digital presence across three platforms.",
    solution:
      "We crafted a full visual identity — typography, color, iconography — and unified it into a single, award-worthy storefront.",
    outcome:
      "Email list grew 520%. Conversion rate doubled. Featured in Vogue's sustainable brand spotlight.",
    gradient: "linear-gradient(135deg, #1f1c1c 0%, #4a3f35 40%, #c9a84c 100%)",
    height: "h-96",
    gallery: [
      { gradient: "linear-gradient(135deg, #1f1c1c, #c9a84c)", caption: "Brand identity" },
      { gradient: "linear-gradient(135deg, #4a3f35, #1f1c1c)", caption: "Storefront" },
      { gradient: "linear-gradient(135deg, #0f0f0f, #8b6914)", caption: "Lookbook" },
    ],
  },
  {
    slug: "nexus-saas",
    name: "Nexus SaaS",
    category: "Web",
    year: "2024",
    client: "Nexus Incubator",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe"],
    tagline: "The operating system for founders.",
    description:
      "A B2B SaaS platform connecting early-stage startups with mentors, capital, and tools in one unified workspace.",
    problem:
      "Nexus operated via spreadsheets and email threads. Stakeholders couldn't see pipeline progress.",
    solution:
      "We designed and engineered a modular workspace with real-time collaboration, billing, and an investor portal.",
    outcome:
      "Onboarding time cut by 70%. $14M in funding facilitated through the platform in year one.",
    gradient: "linear-gradient(135deg, #0c0f14 0%, #1a2230 40%, #c9a84c 100%)",
    height: "h-80",
    gallery: [
      { gradient: "linear-gradient(135deg, #0c0f14, #c9a84c)", caption: "Workspace" },
      { gradient: "linear-gradient(135deg, #1a2230, #0c0f14)", caption: "Investor portal" },
      { gradient: "linear-gradient(135deg, #0f0f0f, #8b6914)", caption: "Analytics" },
    ],
  },
  {
    slug: "obsidian-agency",
    name: "Obsidian Agency",
    category: "Web",
    year: "2022",
    client: "Obsidian Creative",
    techStack: ["Next.js", "GSAP", "Framer Motion", "Sanity CMS"],
    tagline: "An agency site that IS the pitch.",
    description:
      "A bold, animation-driven portfolio site for a creative agency, designed to win client meetings on first load.",
    problem:
      "Obsidian's old site sat dormant — visitors bounced in 11 seconds.",
    solution:
      "We engineered a GSAP-driven experience with ScrollTrigger reveals, horizontal scroll, and a magnetic case-study flow.",
    outcome:
      "Time on site went from 11s to 4m 20s. Inbound leads up 180%. Won Awwwards SOTD.",
    gradient: "linear-gradient(135deg, #0a0a0a 0%, #1c1c1c 40%, #c9a84c 100%)",
    height: "h-104",
    gallery: [
      { gradient: "linear-gradient(135deg, #0a0a0a, #c9a84c)", caption: "Hero sequence" },
      { gradient: "linear-gradient(135deg, #1c1c1c, #0a0a0a)", caption: "Case study" },
      { gradient: "linear-gradient(135deg, #0f0f0f, #8b6914)", caption: "Transitions" },
    ],
  },
  {
    slug: "pulse-health",
    name: "Pulse Health",
    category: "Mobile",
    year: "2023",
    client: "Pulse Network",
    techStack: ["React Native", "Expo", "TypeScript", "Firebase", "GraphQL"],
    tagline: "Healthcare in your pocket.",
    description:
      "A cross-platform mobile app connecting patients with doctors for on-demand consultations, prescriptions, and records.",
    problem:
      "Pulse needed to reach patients on both iOS and Android with HIPAA-compliant telemedicine — fast.",
    solution:
      "We shipped a React Native app with end-to-end encryption, video calls, and e-prescribing in 11 weeks.",
    outcome:
      "120k downloads in the first quarter. 4.9-star rating. Zero compliance incidents.",
    gradient: "linear-gradient(135deg, #0d1b1a 0%, #1b3a3b 40%, #c9a84c 100%)",
    height: "h-72",
    gallery: [
      { gradient: "linear-gradient(135deg, #0d1b1a, #c9a84c)", caption: "Onboarding" },
      { gradient: "linear-gradient(135deg, #1b3a3b, #0d1b1a)", caption: "Video consultation" },
      { gradient: "linear-gradient(135deg, #0f0f0f, #8b6914)", caption: "Records" },
    ],
  },
  {
    slug: "aurora-studio",
    name: "Aurora Studio",
    category: "Branding",
    year: "2024",
    client: "Aurora Productions",
    techStack: ["Figma", "After Effects", "Lottie", "React"],
    tagline: "Motion as identity.",
    description:
      "A dynamic brand system for a motion-design studio, including logo animation, motion guidelines, and a living web presence.",
    problem:
      "Aurora's brand felt static despite being a motion studio. Inconsistent across every touchpoint.",
    solution:
      "We built a living identity — a logo that breathes, type that moves, and a website that demonstrates the brand in action.",
    outcome:
      "Rebrand drove a 3x increase in inbound production inquiries. Retainer clients doubled.",
    gradient: "linear-gradient(135deg, #14121f 0%, #2d1b3d 40%, #c9a84c 100%)",
    height: "h-96",
    gallery: [
      { gradient: "linear-gradient(135deg, #14121f, #c9a84c)", caption: "Logo system" },
      { gradient: "linear-gradient(135deg, #2d1b3d, #14121f)", caption: "Motion guidelines" },
      { gradient: "linear-gradient(135deg, #0f0f0f, #8b6914)", caption: "Web presence" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
