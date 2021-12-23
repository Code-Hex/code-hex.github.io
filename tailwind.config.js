const colors = require('tailwindcss/colors');
const mdx = require('@mdx-js/mdx');

// ref:
// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
// https://github.com/sindresorhus/github-markdown-css/blob/main/github-markdown.css
module.exports = {
  content: {
    files: [
      './src/pages/**/*.{ts,tsx,mdx}',
      './src/components/**/*.tsx',
      './src/layouts/**/*.tsx',
      './next.config.js',
    ],
    transform: {
      mdx: mdx.sync,
    },
  },
  theme: {
    cursor: {
      'col-resize': 'col-resize',
    },
    fontFamily: {
      'noto-sans-jp': ['Noto Sans JP'],
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
      gray: colors.gray,
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
          color: theme('colors.black'),
          h1: {
            fontWeight: '700',
            letterSpacing: theme('letterSpacing.tight'),
            fontSize: theme('fontSize.3xl'),
            marginTop: theme('margin.4'),
            marginBottom: theme('margin.3'),
          },
          h2: {
            fontWeight: '700',
            letterSpacing: theme('letterSpacing.tight'),
            fontSize: theme('fontSize.2xl'),
            marginTop: theme('margin.8'),
            marginBottom: theme('margin.7'),
          },
          h3: {
            fontWeight: '600',
            fontSize: theme('fontSize.xl'),
            marginTop: theme('margin.6'),
            marginBottom: theme('margin.5'),
          },
          h4: {
            fontWeight: '600',
            fontSize: theme('fontSize.lg'),
            marginTop: theme('margin.4'),
            marginBottom: theme('margin.3'),
          },
          'h1, h2, h3, h4': {
            display: 'flex',
            alignItems: 'center',
            '&:hover > a > svg': {
              color: theme('colors.gray.500'),
            },
          },
          'a > svg': {
            marginLeft: '-' + theme('margin.5'),
            width: theme('spacing.4'),
            color: theme('colors.transparent'),
            '&:hover': {
              color: theme('colors.gray.500'),
            },
          },
          hr: {
            margin: `${theme('margin.4')} 0`,
          },
          p: {
            marginBottom: theme('margin.4'),
          },
          ul: {
            listStyleType: 'disc',
            paddingLeft: theme('padding.4'),
            marginBottom: theme('margin.4'),
          },
          ol: {
            listStyleType: 'decimal',
            paddingLeft: theme('padding.4'),
            marginBottom: theme('margin.4'),
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
            padding: theme('padding.4'),
            marginBottom: theme('margin.4'),
            overflow: 'auto',
            marginLeft: '-' + theme('margin.8'),
            marginRight: '-' + theme('margin.8'),
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
            fontSize: theme('fontSize.sm'),
          },
          table: {
            marginBottom: theme('margin.2'),
            width: theme('w.full'),
            overflow: 'auto',
            fontWeight: '500',
          },
          th: {
            padding: theme('padding.2'),
            fontWeight: '600',
            borderWidth: theme('borderWidth.DEFAULT'),
            borderColor: theme('colors.gray.400'),
          },
          td: {
            padding: theme('padding.2'),
            borderWidth: theme('borderWidth.DEFAULT'),
            borderColor: theme('colors.gray.400'),
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
      sm: {
        css: {
          pre: {
            marginLeft: '-' + theme('margin.10'),
            marginRight: '-' + theme('margin.10'),
          },
        },
      },
      md: {
        css: {
          pre: {
            borderRadius: theme('borderRadius.md'),
            marginLeft: 0,
            marginRight: 0,
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
