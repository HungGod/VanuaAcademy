/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media', // Enable dark mode based on system preference
  theme: {
    extend: {
      colors: {
        primary: '#72955f',
        secondary: '#5a7a4a',
      },
    },
  },
  plugins: [],
}





