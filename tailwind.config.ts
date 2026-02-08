import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1E3A5A",
          deep: "#142942",
          light: "#2A5078",
        },
        gold: {
          DEFAULT: "#F59E0B",
          light: "#FBD38D",
          pale: "#FEF3C7",
        },
        warm: {
          white: "#FFFBF5",
          bg: "#FFF8EE",
        },
        cream: "#FDF6EC",
        text: {
          DEFAULT: "#334155",
          light: "#64748B",
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "16px",
        sm: "10px",
        lg: "24px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(30,58,90,0.06)",
        DEFAULT: "0 4px 20px rgba(30,58,90,0.08)",
        md: "0 4px 20px rgba(30,58,90,0.08)",
        lg: "0 12px 40px rgba(30,58,90,0.12)",
        xl: "0 24px 60px rgba(30,58,90,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
