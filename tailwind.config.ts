import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Manrope",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        "light-cyan": "#cee3e9",
        "neon-green": "#52ffa8",
        "grey-blue": "#4e5d73",
        "dark-grey-blue": "#323a49",
        "dark-blue": "#1f2632",
      },
      fontSize: {
        xs: "0.7rem",
      },
      letterSpacing: {
        widest: "0.25rem",
      }
    },
  },
  plugins: [],
} satisfies Config;
