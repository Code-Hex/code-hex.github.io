const nextBuildId = require('next-build-id');
const withPlugins = require('next-compose-plugins');
const withMdxEnhanced = require('next-mdx-enhanced');

const nextConfig = {
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/unknown': { page: '/unknown' },
      '/stylish': { page: '/stylish' },
      '/slack_invitation': { page: '/slack_invitation' },
      '/note': { page: '/note' },
    };
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx', 'md'],
  // https://nextjs.org/docs/basic-features/image-optimization
  images: {
    domains: ['codehex.dev'],
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};

const emoji = require('remark-emoji');
const rehypePrism = require('@mapbox/rehype-prism');
const visit = require('unist-util-visit');

// NOTE(codehex): ./scripts/post-export.js で nextConfig を読み込みたいので
// _exports という変数を作成し export できるようにしてる。
const _exports = withPlugins(
  [
    // https://github.com/hashicorp/next-mdx-enhanced/issues/18#issuecomment-520144464
    withMdxEnhanced({
      layoutPath: 'layouts/mdx',
      defaultLayout: true,
      fileExtensions: ['mdx', 'md'],
      remarkPlugins: [replacer, [emoji, { padSpaceAfter: true }]],
      rehypePlugins: [rehypePrism],
      reExportDataFetching: false,
    }),
  ],
  nextConfig
);
_exports.nextConfig = nextConfig;
module.exports = _exports;

function replacer(options) {
  function transformer(tree) {
    visit(tree, 'text', function (node) {
      node.value = node.value.replace(/REPLACE/g, 'hellllllo');
    });
  }
  return transformer;
}
