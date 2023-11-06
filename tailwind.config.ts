import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx"],
  theme: {},
  plugins: [require("@tailwindcss/forms")],
};

export default config;
