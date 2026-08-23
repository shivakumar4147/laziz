/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        urban: {
          bg: "#0A0A0A",
          card: "#121212",
          green: "#C5FF00",
          yellow: "#E8FF00",
          accent: "#D4FF00",
        },
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        graffiti: ['var(--font-permanent)', 'cursive'],
        body: ['var(--font-outfit)', 'sans-serif'],
      },
      dropShadow: {
        'spray': '0 0 15px rgba(197, 255, 0, 0.6)',
        'dark-glow': '0 10px 30px rgba(0, 0, 0, 0.8)',
      }
    },
  },
  plugins: [],
}
