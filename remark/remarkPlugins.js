const emoji = require('remark-emoji');
// TOOD: fix https://github.com/PrismJS/prism/issues/1403
// const { withSyntaxHighlighting } = require('./withSyntaxHighlighting');
const footnotes = require('remark-footnotes');
const slug = require('remark-slug');
const autoLinkHeadings = require('remark-autolink-headings');

module.exports.remarkPlugins = [
  // withSyntaxHighlighting,
  footnotes,
  slug,
  [
    autoLinkHeadings,
    {
      content: {
        // https://heroicons.com/ Outline link
        type: 'element',
        tagName: 'svg',
        properties: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 24 24',
          class: '-ml-6 h-5 w-5 hover:text-gray-500 text-transparent',
          fill: 'none',
          stroke: 'currentColor',
        },
        children: [
          {
            type: 'element',
            tagName: 'path',
            properties: {
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '2',
              d:
                'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
            },
          },
        ],
      },
    },
  ],
  [emoji, { padSpaceAfter: true }],
];
