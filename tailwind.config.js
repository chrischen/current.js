/** @type {import('tailwindcss').Config} */
import aspectRatio from '@tailwindcss/aspect-ratio'
export default {
  content: ["./index.html", "./src/**/*.{mjs,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#c182f8',
          900: '#8d6ba6',
        },
      },
      minHeight: theme => ({
        ...theme('spacing'),
      }),
    },
  },
  /* corePlugins: {
    aspectRatio: true,
  }, */
  plugins: [aspectRatio],
};
