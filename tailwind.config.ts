import type { Config } from "tailwindcss";

// Tokens mirror design-system/tokens/colors.css (dashboard "soft dark" context).
// The booth kiosk ultra-contrast palette is namespaced under `booth.*`.
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A", // --surface-base
        surface: {
          DEFAULT: "#111111", // --surface-raised (cards, panels)
          overlay: "#1A1A1A", // --surface-overlay (modals, dropdowns)
          elevated: "#222222", // --surface-elevated (hover)
        },
        border: {
          DEFAULT: "#2A2A2A",
          faint: "rgba(255,255,255,0.06)",
        },
        foreground: "#F5F5F0", // --text-primary
        muted: "#A3A39A", // --text-secondary
        faint: "#666660", // --text-tertiary
        amber: {
          DEFAULT: "#F5A623",
          bright: "#FFB830",
          dim: "#B57A18",
          subtle: "#2A1F08",
          50: "#FEF7E8",
          100: "#FDECC6",
          200: "#FBD98D",
          300: "#F8C154",
          400: "#F5A623",
          500: "#E08E0B",
          600: "#B87008",
          700: "#8A5406",
          800: "#5C3804",
          900: "#2E1C02",
        },
        success: "#22C55E",
        error: "#EF4444",
        info: "#3B82F6",
        booth: {
          bg: "#000000",
          text: "#FFFFFF",
          muted: "#999999",
          amber: "#F5A623",
          success: "#00FF88",
          error: "#FF3333",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        // brand rule: no corners > 12px
        lg: "10px",
        xl: "12px",
      },
      letterSpacing: {
        plate: "0.1em",
        wordmark: "0.15em",
        label: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
