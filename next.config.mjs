/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx'],
  // https://nextjs.org/docs/basic-features/image-optimization
  images: {
    domains: ['codehex.dev'],
  },
};

export default nextConfig;
