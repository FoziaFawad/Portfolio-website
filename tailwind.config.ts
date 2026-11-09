import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary, #3b82f6)",
          foreground: "var(--primary-foreground, #ffffff)",
        },
        card: {
          DEFAULT: "var(--card, #ffffff)",
          foreground: "var(--card-foreground, #09090b)",
        },
        muted: {
          DEFAULT: "var(--muted, #f4f4f5)",
          foreground: "var(--muted-foreground, #71717a)",
        },
        accent: {
          DEFAULT: "var(--accent, #f4f4f5)",
          foreground: "var(--accent-foreground, #18181b)",
        },
        border: "var(--border, #e4e4e7)",
      },
      borderRadius: {
        lg: "var(--radius, 0.75rem)",
        md: "calc(var(--radius, 0.75rem) - 2px)",
        sm: "calc(var(--radius, 0.75rem) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
