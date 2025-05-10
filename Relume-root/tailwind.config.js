/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './home/**/*.{js,ts,jsx,tsx}',
    './node_modules/@relume_io/relume-ui/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@relume_io/relume-tailwind'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
