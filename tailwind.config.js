/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/pages/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      "mono": ["'Source Code Pro'", "Menlo", "monospace"],
      "sans": ['Inter', 'apple-system', 'Ubuntu', 'Roboto', 'Oxygen', 'sans-serif']
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
