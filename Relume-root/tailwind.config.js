/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./home/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css"
  ],
  presets: [require("@relume_io/relume-tailwind")]
}
