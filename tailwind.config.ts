import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1E1E1A",
        ivory: "#F7F5F0",
        gold: "#B99A5C",
        moss: "#596052",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Arial", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
