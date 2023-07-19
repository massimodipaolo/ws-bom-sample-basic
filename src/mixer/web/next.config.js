/* eslint-disable @typescript-eslint/no-var-requires */
const nextTranspileModules = require('next-transpile-modules');
const packagejson = require('./package.json');
const dependencies = Object.keys(packagejson.dependencies).filter(x =>
  x.indexOf('@websolutespa') === 0 ||
  x.indexOf('@ws-bom-sample-basic') === 0
);
const mixer = require('./src/mixer.json');
const { keeper } = require('@websolutespa/dotenv-keeper');
// https://github.com/vercel/turbo/issues/3340

const transpiledModules = nextTranspileModules([
  ...dependencies,
], { resolveSymlinks: false });

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = async () => {
  const dotenv = await keeper();
  const env = {
    ...dotenv.parsed,
    COLLECTIONS: [...mixer.pages, ...mixer.collections].join(','),
    MOCKS: [...mixer.mocks].join(','),
    PAGES: mixer.pages.join(','),
  };
  // console.log('NextConfigJs.dotenv', dotenv.parsed);
  return withBundleAnalyzer(transpiledModules({
    env,
    reactStrictMode: true,
    async headers() {
      return [
        {
          // matching all API routes
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
            { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
          ]
        }
      ];
    },
    images: {
      domains: [
        'localhost',
        'unsplash.com',
        'picsum.photos',
        'i.pravatar.cc',
        'placehold.jp',
        process.env.IMAGE_DOMAIN,
      ]
    },
    compiler: {
      styledComponents: {
        ssr: true,
        displayName: true,
        pure: true,
      },
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: { and: [/\.(js|ts|md)x?$/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: true,
              svgoConfig: {
                plugins: [{
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false },
                  },
                }],
              },
              titleProp: true,
            },
          },
        ],
      });
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
      return config;
    },
    // trailingSlash: true,
    // Docker support: build the project as a standalone app inside the Docker image
    output: 'standalone',
    experimental: {
      largePageDataBytes: 250 * 1000,
      forceSwcTransforms: true,
      esmExternals: 'loose',
    }
  }));
};
