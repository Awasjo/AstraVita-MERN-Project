/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        'dark-blue': '#30336B',
        'light-blue': '#22A6B3',
        'light-theme': '#F1F1F1',
        'dark-theme': '#222222',
        'gray-color': '#C7C7D7',
        'gray-color-2': '#333333',
        'strong-blue': '#0071BC',
        'lavender-gray-light': '#D9DAE4',
        'lavender-gray-dark': '#B1B3CA',
        'navy-blue-dark': '#181A36',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      minHeight: {
        'home-container': '600px',
      },
    },

  },
  plugins: [],
}

