module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      colors: {
        code: {
          green: '#a7f3d0',
          yellow: '#ffe484',
          purple: '#e879f9',
          red: '#f47067',
          blue: '#6cb6ff',
          white: '#acb9c6',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
