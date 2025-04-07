import Core from "@sk-web-gui/core";
import { Config } from "tailwindcss/types/config";
import ContainerQueries from "@tailwindcss/container-queries";

export default {
  mode: "jit",
  content: [
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sk-web-gui/*/dist/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        DEFAULT: ["Raleway", "Arial", "Helvetica", "sans-serif"],
      },
      fontWeight: {
        DEFAULT: "500",
      },
      lineHeight: {
        base: "130%",
      },
      boxShadow: {
        upper: `0 -1rem 1.2rem 0.5rem var(--tw-shadow-colored),
                0 -0.2rem 0.2rem 0.2rem var(--tw-shadow-colored)`,
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        stretch: {
          "0%, 50%, 100%": { transform: "scale(1,1)" },
          "25%": { transform: "scale(1,1.2)" },
          "75%": { transform: "scale(1,0.8)" },
        },
      },
      animation: {
        blink: "blink 1s infinite",
      },
    },
  },
  plugins: [
    Core({
      cssBase: true,
      colors: [],
    }),
    ContainerQueries,
  ],
} satisfies Config;
