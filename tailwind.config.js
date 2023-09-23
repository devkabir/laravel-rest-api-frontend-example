/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Mooli', 'sans-serif']
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}