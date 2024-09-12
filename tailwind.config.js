// tailwind.config.js
const { nextui } = require('@nextui-org/theme');

module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Extend or customize your color palette here
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        pulse: 'pulse 2s infinite',
        bounce: 'bounce 2s infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
