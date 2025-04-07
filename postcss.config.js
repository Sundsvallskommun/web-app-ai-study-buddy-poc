import path from "path";

export default {
  plugins: {
    // "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: { config: path.join(".", "tailwind.config.ts") },
    autoprefixer: {},
  },
};
