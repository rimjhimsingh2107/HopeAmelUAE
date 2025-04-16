/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        logoGreen: '#8ABF7F',
      logoYellow: '#F7E46C',
      softBlue: '#D0E8F2',
      faintGray: '#F9FAFB',
        bluePrimary: '#22577A',
        yellowAccent: '#FFE066',
        yellowDeep: '#FFB703',
        softBlue: '#D0E8F2',
      }
    },
  
  plugins: [],
}
}
