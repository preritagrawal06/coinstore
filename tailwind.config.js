/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/bgImg.jpg'),linear-gradient(90deg, rgba(9, 7, 10, 0.76) 0.26%, rgba(30, 45, 74, 0.76) 99.8%)"
      }
    },
  },
  plugins: [],
}