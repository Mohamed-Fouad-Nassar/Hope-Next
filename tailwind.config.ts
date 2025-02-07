import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // main: {
        //   200: "#a2e3eb",
        //   400: "#04bed7",
        //   500: "#06a7bd",
        //   600: "#049cb1",
        //   700: "#058ea1",
        //   800: "#068495",
        //   900: "#007a8b",
        // },
        main: {
          50: "#e5f8fa",
          100: "#c8eff3",
          200: "#a2e3eb",
          300: "#6fd6e2",
          400: "#04bed7",
          500: "#06a7bd",
          600: "#049cb1",
          700: "#058ea1",
          800: "#068495",
          900: "#007a8b",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
export default config;
