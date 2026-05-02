export interface Testimonial {
  name: string;
  country: string;
  rating: number;
  text: string;
  role?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "James M.",
    country: "Kenya",
    rating: 5,
    role: "Prop-firm trader",
    text: "Apex Scalper EA passed my FTMO challenge in 9 days. The risk management is rock solid and Robert's support is unreal.",
  },
  {
    name: "Aisha K.",
    country: "UAE",
    rating: 5,
    role: "Swing trader",
    text: "Smart Reversal Pro completely changed how I read structure. The signals are clean and the win rate speaks for itself.",
  },
  {
    name: "David O.",
    country: "Nigeria",
    rating: 5,
    role: "Beginner",
    text: "Started from zero with Robert's mentorship. Three months in I'm consistently profitable. Worth every dollar.",
  },
  {
    name: "Sophie L.",
    country: "United Kingdom",
    rating: 4,
    role: "Indices trader",
    text: "FVG Hunter on NAS100 has been a game changer for my morning sessions. Highly recommended.",
  },
  {
    name: "Carlos R.",
    country: "Spain",
    rating: 5,
    role: "Algo trader",
    text: "Robert built me a custom EA in two weeks. Clean code, well documented, performs exactly as agreed. Pro level.",
  },
];

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export const stats: Stat[] = [
  { label: "Clients Served", value: 2400, suffix: "+" },
  { label: "EAs Built", value: 180, suffix: "+" },
  { label: "Avg. Win Rate", value: 72, suffix: "%" },
  { label: "Years Experience", value: 8, suffix: "+" },
];

export interface MentorshipPackage {
  slug: string;
  name: string;
  duration: string;
  price: string;
  delivery: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export const packages: MentorshipPackage[] = [
  {
    slug: "discovery-call",
    name: "Free Discovery Call",
    duration: "30 min",
    price: "Free",
    delivery: "Google Meet",
    description: "Tell me about your trading goals and find out exactly which tool or path is right for you.",
    features: ["Goal assessment", "Tool recommendation", "Honest, no-pressure advice"],
  },
  {
    slug: "one-on-one",
    name: "One-on-One Session",
    duration: "1 hour",
    price: "Contact",
    delivery: "Google Meet",
    description: "Deep-dive session on your trading plan, strategy or any tool from the marketplace.",
    features: ["Live screen-share", "Strategy review", "Risk plan", "Recording included"],
    highlight: true,
  },
  {
    slug: "beginner-crash-course",
    name: "Beginner Crash Course",
    duration: "4 sessions",
    price: "Contact",
    delivery: "Google Meet + Notes",
    description: "From zero to your first funded account. Forex foundations, structure, risk and execution.",
    features: ["4 x 90 min sessions", "Course notes & checklists", "Telegram support", "Tool starter pack"],
  },
  {
    slug: "advanced-mentorship",
    name: "Advanced Mentorship",
    duration: "8 weeks",
    price: "Contact",
    delivery: "Google Meet + Telegram",
    description: "Full mentorship for serious traders ready to scale. SMC, algo design and prop-firm prep.",
    features: ["Weekly live sessions", "Custom EA blueprint", "Prop-firm prep", "Lifetime alumni group"],
  },
];

export const SOCIALS = {
  whatsapp: "https://wa.me/254700000000",
  telegram: "https://t.me/smartalgosts",
  instagram: "https://instagram.com/smartalgosts",
  youtube: "https://youtube.com/@smartalgosts",
  tiktok: "https://tiktok.com/@smartalgosts",
  twitter: "https://x.com/smartalgosts",
  facebook: "https://facebook.com/smartalgosts",
  email: "hello@smartalgosts.com",
};
