import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Surface tokens — drive backgrounds via CSS variables for clean dark mode.
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: {
          DEFAULT: "rgb(var(--color-muted) / <alpha-value>)",
          foreground: "rgb(var(--color-muted-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--color-border) / <alpha-value>)",

        // Brand palette
        primary: {
          50: "#eef4ff",
          100: "#dae6ff",
          200: "#bcd2ff",
          300: "#8eb4ff",
          400: "#5a8bff",
          500: "#3366ff",
          600: "#1f47e6",
          700: "#1a38b8",
          800: "#1b3192",
          900: "#1c2e75",
          950: "#131c47",
          DEFAULT: "#3366ff",
          foreground: "#ffffff",
        },
        secondary: {
          50: "#f5f7fa",
          100: "#e9edf2",
          200: "#cfd6e0",
          300: "#a6b3c4",
          400: "#7689a1",
          500: "#566c87",
          600: "#43566e",
          700: "#37475a",
          800: "#303d4c",
          900: "#2b3543",
          950: "#1a212b",
          DEFAULT: "#43566e",
          foreground: "#ffffff",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
          DEFAULT: "#f97316",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Type scale (1.25 ratio — major third)
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.05" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
      },
      spacing: {
        // 4pt spacing scale extensions
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "17": "4.25rem",
        "18": "4.5rem",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
        elevated:
          "0 10px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(var(--color-foreground))",
            "--tw-prose-headings": "rgb(var(--color-foreground))",
            "--tw-prose-lead": "rgb(var(--color-muted-foreground))",
            "--tw-prose-links": theme("colors.primary.DEFAULT"),
            "--tw-prose-bold": "rgb(var(--color-foreground))",
            "--tw-prose-counters": "rgb(var(--color-muted-foreground))",
            "--tw-prose-bullets": "rgb(var(--color-muted-foreground))",
            "--tw-prose-hr": "rgb(var(--color-border))",
            "--tw-prose-quotes": "rgb(var(--color-foreground))",
            "--tw-prose-quote-borders": theme("colors.primary.DEFAULT"),
            "--tw-prose-captions": "rgb(var(--color-muted-foreground))",
            "--tw-prose-code": "rgb(var(--color-foreground))",
            "--tw-prose-pre-code": "rgb(var(--color-foreground))",
            "--tw-prose-pre-bg": "rgb(var(--color-muted))",
            "--tw-prose-th-borders": "rgb(var(--color-border))",
            "--tw-prose-td-borders": "rgb(var(--color-border))",
            maxWidth: "none",
            a: { textDecoration: "none", fontWeight: "500" },
            "a:hover": { textDecoration: "underline" },
            code: {
              fontWeight: "500",
              backgroundColor: "rgb(var(--color-muted))",
              padding: "0.15rem 0.35rem",
              borderRadius: "0.3rem",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: {
              border: "1px solid rgb(var(--color-border))",
              borderRadius: "0.625rem",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
