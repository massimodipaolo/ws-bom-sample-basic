/* eslint-disable @typescript-eslint/no-var-requires */
const nextTranspileModules = require('next-transpile-modules');
const packagejson = require('./package.json');
const dependencies = Object.keys(packagejson.dependencies).filter(x =>
  x.indexOf('@websolutespa/bom-mixer-hooks') === 0 ||
  x.indexOf('@websolutespa/bom-mixer-ui') === 0 ||
  x.indexOf('@ws-bom-sample-basic') === 0
);
const { keeper } = require('@websolutespa/dotenv-keeper');

const transpiledModules = nextTranspileModules([
  ...dependencies,
], { resolveSymlinks: false });

module.exports = async () => {
  const dotenv = await keeper();
  // console.log('NextConfigJs.dotenv', dotenv.parsed);
  return transpiledModules({
    env: dotenv.parsed,
    reactStrictMode: true,
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
    experimental: {
      largePageDataBytes: 250 * 1000,
      forceSwcTransforms: true,
      esmExternals: 'loose',
    }
  });
};
