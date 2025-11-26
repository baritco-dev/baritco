/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // رنگ اصلی
        secondary: '#F59E0B', // رنگ ثانویه
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
  // پشتیبانی از RTL
  darkMode: 'class',
};