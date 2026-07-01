import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pageBg: "#f5f5f7",
        surface: "#ffffff",
        surfaceSoft: "#fbfbfd",
        textMain: "#1d1d1f",
        textSoft: "rgba(29, 29, 31, 0.72)",
        textMuted: "rgba(29, 29, 31, 0.56)",
        brand: "#0071e3",
        borderSoft: "rgba(29, 29, 31, 0.08)",
      },
      fontFamily: {
        sans: ['"Microsoft YaHei"', "sans-serif"],
      },
      borderRadius: {
        panel: "32px",
        soft: "18px",
      },
      boxShadow: {
        card: "3px 5px 30px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(294deg, #ff00f7 0%, #1e98fd 100%)",
      },
      maxWidth: {
        page: "980px",
      },
      animation: {
        "card-enter": "card-enter 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      },
      keyframes: {
        "card-enter": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
