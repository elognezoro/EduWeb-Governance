import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Thème visuel EduWeb Governance.
 * Direction artistique : institutionnel, premium, légèrement arrondi.
 * Palette : vert profond EduWeb, bleu institutionnel, or/ambre pour les réussites.
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Nunito Sans", "system-ui", "sans-serif"],
      },
      colors: {
        // Vert EduWeb (couleur dominante)
        brand: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#047857",
          700: "#0F766E",
          800: "#065F46",
          900: "#064E3B",
        },
        // Bleu institutionnel
        institutional: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#1D4ED8",
          700: "#1E40AF",
          900: "#0F172A",
        },
        // Or / réussite
        gold: {
          100: "#FEF3C7",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        // Alerte
        danger: {
          100: "#FEE2E2",
          500: "#DC2626",
          600: "#B91C1C",
        },
        ink: "#334155",
        // Thème clair « anti-éblouissement » : fond gris doux, tuiles en blanc cassé
        // (jamais de blanc pur) pour réduire la fatigue oculaire.
        surface: "#E6E9EF",
        card: "#ECEFF4",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.06)",
        card: "0 1px 2px rgba(15,23,42,0.04), 0 12px 32px -12px rgba(15,23,42,0.12)",
        glow: "0 0 0 1px rgba(15,118,110,0.08), 0 18px 40px -18px rgba(15,118,110,0.35)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out both",
        "scale-in": "scale-in 0.25s ease-out both",
        "slide-in-left": "slide-in-left 0.25s ease-out both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
