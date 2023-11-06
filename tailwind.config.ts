import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {},
  plugins: [require("daisyui")],
};

export default config;
