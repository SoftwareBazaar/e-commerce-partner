export type ProductCategory = "EA" | "Indicator" | "Bot" | "Bundle";
export type Compatibility = "MT4" | "MT5" | "Both";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  compatibility: Compatibility;
  shortDescription: string;
  description: string;
  buyPrice: number;
  rentPrice?: number;
  rating: number;
  reviews: number;
  pairs: string[];
  timeframes: string[];
  youtubeId?: string;
  featured?: boolean;
  tags: string[];
  imageUrl?: string;
}

export const products: Product[] = [
  {
    slug: "smart-reversal-pro",
    name: "Smart Reversal Pro",
    category: "Indicator",
    compatibility: "Both",
    shortDescription: "Advanced reversal detection using multi-timeframe SMC and order-block confluence.",
    description:
      "Smart Reversal Pro identifies high-probability reversal zones by combining Smart Money Concepts, liquidity sweeps and order-block analysis across multiple timeframes. Designed for scalpers and swing traders alike, it delivers clean visual signals with confidence scoring.",
    buyPrice: 249,
    rentPrice: 29,
    rating: 4.9,
    reviews: 184,
    pairs: ["EURUSD", "GBPUSD", "XAUUSD", "USDJPY"],
    timeframes: ["M15", "H1", "H4"],
    youtubeId: "dQw4w9WgXcQ",
    featured: true,
    tags: ["SMC", "Reversal", "Multi-TF"],
  },
  {
    slug: "apex-scalper-ea",
    name: "Apex Scalper EA",
    category: "EA",
    compatibility: "MT5",
    shortDescription: "Aggressive low-latency scalping bot with built-in news filter and dynamic risk management.",
    description:
      "Apex Scalper EA targets high-probability micro-moves on major pairs during the London and New York sessions. Built-in news filter, dynamic lot sizing, trailing stops and a hard daily drawdown limit make it suitable for both prop-firm and live accounts.",
    buyPrice: 599,
    rentPrice: 79,
    rating: 4.8,
    reviews: 312,
    pairs: ["EURUSD", "GBPUSD", "USDJPY"],
    timeframes: ["M1", "M5"],
    youtubeId: "dQw4w9WgXcQ",
    featured: true,
    tags: ["Scalping", "News Filter", "Prop-Firm"],
  },
  {
    slug: "engulfing-master",
    name: "Engulfing Master",
    category: "Indicator",
    compatibility: "Both",
    shortDescription: "Highest-quality engulfing pattern scanner with volume and structure validation.",
    description:
      "Engulfing Master scans every chart in real time for institutional-grade engulfing patterns confirmed by volume spikes and structural breaks, alerting you the moment a setup forms.",
    buyPrice: 149,
    rentPrice: 19,
    rating: 4.7,
    reviews: 98,
    pairs: ["All majors", "Indices", "Gold"],
    timeframes: ["M15", "H1", "H4", "D1"],
    youtubeId: "dQw4w9WgXcQ",
    featured: true,
    tags: ["Price Action", "Alerts"],
  },
  {
    slug: "fvg-hunter-bot",
    name: "FVG Hunter Bot",
    category: "Bot",
    compatibility: "MT5",
    shortDescription: "Semi-automated bot that hunts Fair Value Gaps with disciplined risk and one-click execution.",
    description:
      "FVG Hunter Bot detects unfilled Fair Value Gaps and stages pending orders at premium/discount zones. You stay in control with one-click execution and a clean dashboard.",
    buyPrice: 449,
    rentPrice: 59,
    rating: 4.8,
    reviews: 142,
    pairs: ["XAUUSD", "NAS100", "US30"],
    timeframes: ["M5", "M15"],
    youtubeId: "dQw4w9WgXcQ",
    featured: true,
    tags: ["SMC", "FVG", "Indices"],
  },
  {
    slug: "trend-rider-ea",
    name: "Trend Rider EA",
    category: "EA",
    compatibility: "MT4",
    shortDescription: "Long-term trend follower with pyramid scaling and volatility-aware exits.",
    description:
      "Trend Rider EA identifies established trends and rides them with pyramiding entries and volatility-adaptive trailing stops. Best on H4/D1.",
    buyPrice: 399,
    rentPrice: 49,
    rating: 4.6,
    reviews: 76,
    pairs: ["EURUSD", "AUDUSD", "USDCAD"],
    timeframes: ["H4", "D1"],
    tags: ["Trend", "Swing"],
  },
  {
    slug: "smc-toolkit-bundle",
    name: "SMC Toolkit Bundle",
    category: "Bundle",
    compatibility: "Both",
    shortDescription: "Smart Reversal Pro + Engulfing Master + FVG Hunter at one bundled price.",
    description:
      "Get our three best-selling SMC tools in a single bundle and save over 35%. Includes lifetime updates and priority support.",
    buyPrice: 599,
    rating: 5.0,
    reviews: 64,
    pairs: ["All"],
    timeframes: ["All"],
    tags: ["Bundle", "Best Value"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
