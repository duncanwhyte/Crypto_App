import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "1vw",
          },
          "&::-webkit-scrollbar-track": {
            background: "#FFFFFF",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#6161D6",
            borderRadius: "10px",
          },
        },
        ".dark-scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "1vw",
          },
          "&::-webkit-scrollbar-track": {
            background: "#232334",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#6161D6",
            borderRadius: "10px",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;
