import remarkPlugins from './src/lib/remarkPlugins.mjs';
import nextBuildId from 'next-build-id';
import withPlugins from 'next-compose-plugins';
import { createLoader } from 'simple-functional-loader';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  generateBuildId: () => nextBuildId({ dir: __dirname }),
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
              const path = this.context.replace(/^.*(\/note\/.*)$/, '$1');
              const content = [
                'import Note from "~/components/Note"',
                'import { makeGetStaticProps } from "~/mdx/getStaticProps"',
                src,
                `export const getStaticProps = makeGetStaticProps(meta, "${path}")`,
                'export default (props) => <Note meta={meta} {...props} />',
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

export default withPlugins([], nextConfig);
