const nextBuildId = require('next-build-id');
module.exports = {
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/unknown': { page: '/unknown' },
      '/stylish': { page: '/stylish' },
      '/slack_invitation': { page: '/slack_invitation' },
    };
  },
  // https://nextjs.org/docs/basic-features/image-optimization
  images: {
    domains: ['codehex.dev'],
  },
};
