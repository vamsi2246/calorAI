/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        cardDark: '#1E293B',
        accentEmerald: '#10B981',
        accentCyan: '#06B6D4',
        accentIndigo: '#6366F1',
        accentRose: '#F43F5E',
        textLight: '#F8FAFC',
        textGray: '#94A3B8',
        glassBorder: 'rgba(255, 255, 255, 0.1)'
      },
      fontFamily: {
        sans: ['System']
      }
    },
  },
  plugins: [],
}
