import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Dmsans: ["DM Sans", "sans-serif"],
        Philosopher: ["Philosopher", "sans-serif"],
        SpaceGrotesk: ["SpaceGrotesk", "sans-serif"],
        Dmserif: ["DM Serif Text", "serif"],
        Code: ["Source Code Pro", "monospace"]
      },
    },
  },
  plugins: [],
};
export default config;
