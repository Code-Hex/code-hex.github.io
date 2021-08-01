const nextBuildId = require('next-build-id');
const withPlugins = require('next-compose-plugins');
const { createLoader } = require('simple-functional-loader');

// remark plugins
const emoji = require('remark-emoji');
const { withSyntaxHighlighting } = require('./remark/withSyntaxHighlighting');
const visit = require('unist-util-visit');
const footnotes = require('remark-footnotes');
const slug = require('remark-slug');
const autoLinkHeadings = require('remark-autolink-headings');

const nextConfig = {
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  exportPathMap: async function () {
    const notes = ['hello.mdx', 'hello2.mdx']; // TODO(codehex): fix
    const notePaths = notes.map((v) => '/note/' + v.replace(/\.mdx$/, ''));
    let pages = {
      '/': { page: '/' },
      '/unknown': { page: '/unknown' },
      '/note': { page: '/note' },
    };
    notePaths.forEach((v) => {
      pages[v] = {
        page: v,
      };
    });
    return pages;
  },
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // https://nextjs.org/docs/basic-features/image-optimization
  images: {
    domains: ['codehex.dev'],
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  webpack: (config, options) => {
    const mdx = [
      options.defaultLoaders.babel,
      {
        loader: '@mdx-js/loader',
        options: {
          remarkPlugins: [
            withSyntaxHighlighting,
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
          ],
        },
      },
    ];

    config.module.rules.push({
      test: /\.mdx$/,
      oneOf: [
        {
          resourceQuery: /preview/,
          use: [
            ...mdx,
            createLoader(function (src) {
              if (src.includes('<!--more-->')) {
                const [preview] = src.split('<!--more-->');
                return this.callback(null, preview);
              }
              return this.callback(null, src);
            }),
          ],
        },
        {
          use: [
            ...mdx,
            createLoader(function (src) {
              const content = [
                'import Note from "~/components/Note"',
                // 'export { getStaticProps } from "@/getStaticProps"',
                src,
                'export default Note',
              ].join('\n');

              if (content.includes('<!--more-->')) {
                return this.callback(
                  null,
                  content.split('<!--more-->').join('\n')
                );
              }

              return this.callback(null, content);
            }),
          ],
        },
      ],
    });
    return config;
  },
};

// NOTE(codehex): ./scripts/post-export.js で nextConfig を読み込みたいので
// _exports という変数を作成し export できるようにしてる。
const _exports = withPlugins([], nextConfig);
_exports.nextConfig = nextConfig;
module.exports = _exports;
