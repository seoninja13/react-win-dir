/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./home/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./1000-series/**/*.{js,ts,jsx,tsx}",
    "./2000-series/**/*.{js,ts,jsx,tsx}",
    "./3000-series/**/*.{js,ts,jsx,tsx}",
    "./4000-series/**/*.{js,ts,jsx,tsx}",
    "./5000-series/**/*.{js,ts,jsx,tsx}",
    "./vinyl-siding/**/*.{js,ts,jsx,tsx}",
    "./service-areas/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [require("@relume_io/relume-tailwind")]
}
