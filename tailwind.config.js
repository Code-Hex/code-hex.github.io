const colors = require('tailwindcss/colors');
const mdx = require('@mdx-js/mdx');

// ref:
// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
// https://github.com/sindresorhus/github-markdown-css/blob/main/github-markdown.css
module.exports = {
  mode: 'jit',
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
    cursor: {
      'col-resize': 'col-resize',
    },
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
    typography: (theme) => ({
      DEFAULT: {
        css: {
          color: theme('colors.gray.700'),
          h1: {
            display: 'flex',
            fontWeight: '700',
            letterSpacing: theme('letterSpacing.tight'),
            color: theme('colors.gray.900'),
            fontSize: theme('fontSize.4xl'),
            marginTop: theme('margin.3'),
            marginBottom: theme('margin.2'),
          },
          h2: {
            display: 'flex',
            fontWeight: '700',
            letterSpacing: theme('letterSpacing.tight'),
            color: theme('colors.gray.900'),
            fontSize: theme('fontSize.3xl'),
            marginTop: theme('margin.3'),
            marginBottom: theme('margin.2'),
          },
          h3: {
            display: 'flex',
            fontWeight: '600',
            color: theme('colors.gray.900'),
            fontSize: theme('fontSize.2xl'),
            marginTop: theme('margin.3'),
            marginBottom: theme('margin.2'),
          },
          h4: {
            display: 'flex',
            fontWeight: '600',
            color: theme('colors.gray.900'),
            fontSize: theme('fontSize.xl'),
            marginTop: theme('margin.3'),
            marginBottom: theme('margin.2'),
          },
          p: {
            color: theme('colors.gray.700'),
            marginBottom: theme('margin.2'),
          },
          li: {},
          ul: {
            listStyleType: 'disc',
            paddingLeft: theme('padding.4'),
            marginBottom: theme('margin.2'),
          },
          ol: {
            listStyleType: 'decimal',
            paddingLeft: theme('padding.4'),
            marginBottom: theme('margin.2'),
          },
          a: {
            color: theme('colors.blue.700'),
            fontWeight: 400,
            'text-decoration': 'underline',
            '&:hover': {
              color: theme('colors.blue.500'),
            },
            '&:visited': {
              color: theme('colors.purple.500'),
            },
          },
          pre: {
            color: theme('colors.white'),
            backgroundColor: theme('colors.gray.800'),
            'border-radius': theme('borderRadius.md'),
            padding: theme('padding.4'),
            marginBottom: theme('margin.2'),
            overflow: 'auto',
          },
          code: {
            color: theme('colors.pink.600'),
            quotes: "'`' '`'",
            '&:before': {
              content: 'open-quote',
            },
            '&:after': {
              content: 'close-quote',
            },
          },
          blockquote: {
            marginBottom: theme('margin.2'),
            paddingLeft: theme('padding.4'),
            color: theme('colors.gray.900'),
            borderLeftColor: theme('colors.gray.300'),
            borderLeftWidth: theme('borderWidth.4'),
            'font-style': 'italic',
          },
          // inlineCode in mdx
          'pre > code': {
            '&:before': {
              content: 'none',
            },
            '&:after': {
              content: 'none',
            },
            color: theme('colors.white'),
            fontFamily: theme('fontFamily.mono'),
            fontSize: theme('fontSize.sm'),
          },
          table: {
            marginBottom: theme('margin.2'),
            width: theme('w.full'),
            overflow: 'auto',
            fontWeight: '600',
          },
          'table th': {
            fontWeight: '600',
          },
          td: {
            padding: theme('padding.2'),
            borderTop: theme('border.2'),
            fontSize: theme('fontSize.sm'),
            'white-space': 'normal',
          },
          em: {
            'font-style': 'italic',
          },
          details: {
            cursor: 'pointer',
            marginBottom: theme('margin.2'),
          },
          summary: {
            display: 'list-item',
          },
        },
      },
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
