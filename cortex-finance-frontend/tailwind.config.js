/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0a0a0f',
        bgSecondary: '#14141f',
        accentCyan: '#00f0ff',
        accentPurple: '#b026ff',
        accentGreen: '#00ff88',
        textSecondary: '#a0a0b0',
        glassBg: 'rgba(20, 20, 31, 0.6)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
