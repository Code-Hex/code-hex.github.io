const colors = require('tailwindcss/colors');
const mdx = require('@mdx-js/mdx');

module.exports = {
  purge: {
    content: [
      './pages/**/*.{ts,tsx,mdx}',
      './components/**/*.{ts,tsx}',
      './next.config.js',
    ],
    transform: {
      mdx: mdx.sync,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: '#000',
      white: '#fff',

      amber: colors.amber,
      blue: colors.blue,
      cyan: colors.cyan,
      emerald: colors.emerald,
      fuchsia: colors.fuchsia,
      gray: colors.coolGray,
      green: colors.green,
      indigo: colors.indigo,
      sky: colors.sky,
      lime: colors.lime,
      orange: {
        ...colors.orange,
        1000: '#4a2008',
      },
      pink: {
        ...colors.pink,
        1000: '#460d25',
      },
      purple: colors.purple,
      red: colors.red,
      rose: colors.rose,
      teal: colors.teal,
      violet: colors.violet,
      yellow: colors.yellow,
      code: {
        punctuation: '#A1E8FF',
        tag: '#D58FFF',
        'attr-name': '#4BD0FB',
        'attr-value': '#A2F679',
        string: '#A2F679',
        highlight: 'rgba(134, 239, 172, 0.25)',
      },
    },
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
