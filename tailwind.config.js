/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        neon: {
          blue: '#38bdf8',
          pink: '#f472b6',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(56, 189, 248, 0.25)',
      },
    },
  },
  plugins: [],
};
