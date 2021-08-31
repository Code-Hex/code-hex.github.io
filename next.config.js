require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    baseUrl: '.',
    strict: true,
  },
}); // for remarkPlugins
const { remarkPlugins } = require('./remark/remarkPlugins');
const nextBuildId = require('next-build-id');
const withPlugins = require('next-compose-plugins');
const { createLoader } = require('simple-functional-loader');

/**
 * @type {import("next").NextConfig}
 */
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
    if (!options.isServer) {
      // https://github.com/vercel/next.js/issues/7755#issuecomment-812805708
      config.resolve.fallback.fs = false;

      // for worker
      // https://nju33.com/notes/nextjs/articles/Web%20Worker%20%E3%82%92%E4%BD%BF%E3%81%86#next.config.js
      config.output.globalObject = 'self';
    }

    const mdx = [
      options.defaultLoaders.babel,
      {
        loader: '@mdx-js/loader',
        options: {
          remarkPlugins: remarkPlugins,
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
                // @ts-ignore
                return this.callback(null, preview);
              }
              // @ts-ignore
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
                // @ts-ignore
                return this.callback(
                  null,
                  content.split('<!--more-->').join('\n')
                );
              }
              // @ts-ignore
              return this.callback(null, content);
            }),
          ],
        },
      ],
    });
    return config;
  },
};

// https://dev.to/swyx/how-to-add-monaco-editor-to-a-next-js-app-ha3
const withTM = require('next-transpile-modules')([
  // `monaco-editor` isn't published to npm correctly: it includes both CSS
  // imports and non-Node friendly syntax, so it needs to be compiled.
  'monaco-editor',
  'unist-util-visit',
  'unist-util-remove',
]);

// NOTE(codehex): ./scripts/post-export.js で nextConfig を読み込みたいので
// _exports という変数を作成し export できるようにしてる。
const _exports = withPlugins([withTM], nextConfig);
_exports.nextConfig = nextConfig;
module.exports = _exports;
