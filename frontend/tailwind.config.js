/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#30336B',
        'light-blue': '#22A6B3',
        'light-theme': '#F1F1F1',
        'dark-theme': '#222222',
      },
    },

  },
  plugins: [],
}

