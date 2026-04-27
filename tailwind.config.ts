import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3DA9FC",
          50: "#EBF6FF",
          100: "#D6ECFF",
          200: "#ADD9FF",
          300: "#85C5FF",
          400: "#5CB1FE",
          500: "#3DA9FC",
          600: "#0C86E0",
          700: "#0966AB",
          800: "#064677",
          900: "#032742",
        },
        accent: {
          DEFAULT: "#FFD23F",
          50: "#FFFAE5",
          100: "#FFF4CC",
          200: "#FFE999",
          300: "#FFDE66",
          400: "#FFD23F",
          500: "#FFC700",
          600: "#CC9F00",
        },
        cream: "#FFFCF0",
        success: "#4ADE80",
        error: "#F87171",
      },
      fontFamily: {
        heading: ["var(--font-fredoka)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
