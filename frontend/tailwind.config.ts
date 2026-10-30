import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        surface: "#0F0F0F",
        card: "#141414",
        gold: "#C9A84C",
        white: "#F5F5F5",
        muted: "#666666",
        border: "#1F1F1F",
      },
      fontFamily: {
        display: ['"Clash Display"', "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        hero: ["6rem", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "700" }],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 20%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        scrollPulse: {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(0.6)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        grain: "grain 8s steps(10) infinite",
        scrollPulse: "scrollPulse 2s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #8B6914 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
