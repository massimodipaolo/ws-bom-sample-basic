
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { CollectionOptions } from '@payloadcms/plugin-cloud-storage/dist/types';
import seo from '@payloadcms/plugin-seo';
import { keeper } from '@websolutespa/dotenv-keeper';
import bowl, { BowlCollection, BowlGlobal, Icon, Logo } from '@websolutespa/payload-plugin-bowl';
import '@websolutespa/payload-plugin-bowl/dist/index.css';
import { fsStorageAdapter } from '@websolutespa/payload-plugin-cloud-storage-fs';
import { localization } from '@websolutespa/payload-plugin-localization';
import * as path from 'path';
import { buildConfig } from 'payload/config';
import { CollectionConfig, GlobalConfig } from 'payload/types';
import { Homepage } from './collections/HomePage';
import { Users } from './collections/Users';
import { defaultLocale, group, locales, pages, slug, translations } from './config';

export default keeper().then(() => {

  const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || '';
  const basePath = process.env.PAYLOAD_PUBLIC_BASE_PATH || '';

  const collections: BowlCollection[] = [
    // Content
    Homepage,
    // I18N
    // Admin
    Users,
  ];

  const globals: BowlGlobal[] = [
    // Admin
  ];

  return buildConfig({
    serverURL,
    // cors: '*',
    telemetry: false,
    admin: {
      user: Users.slug,
      meta: {
        titleSuffix: '- Bowl',
        favicon: `${basePath}/assets/bowl-favicon.svg`,
        ogImage: `${basePath}/assets/bowl-logo.svg`,
      },
      components: {
        graphics: {
          Logo,
          Icon,
        },
      },
      css: path.resolve(__dirname, './styles.scss'),
    },
    localization: {
      locales: [...locales],
      defaultLocale,
      fallback: true,
    },
    i18n: {
      resources: translations,
      fallbackLng: defaultLocale,
      debug: false,
    },
    collections: collections as CollectionConfig[],
    globals: globals as GlobalConfig[],
    express: {
      preMiddleware: [(req, res, next) => {
        // console.log('preMiddleware.request', req.url);
        next();
      }],
    },
    plugins: [
      bowl({
        group: group,
      }),
      cloudStorage({
        collections: {
          [slug.media]: {
            adapter: fsStorageAdapter({
              baseDir: process.env.FS_STORAGE_BASEDIR,
              baseURL: process.env.FS_STORAGE_BASEURL,
            }),
            disablePayloadAccessControl: process.env.FS_STORAGE_DISABLE_PAYLOAD_ACCESS_CONTROL == 'true'
          },
        } as Record<string, CollectionOptions>,
      }),
      seo({
        collections: pages,
        globals: [],
        uploadsCollection: slug.media,
        tabbedUI: false,
      }),
      localization(),
    ],
    typescript: {
      outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
      schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
    // indexSortableFields: true
    routes: {
      api: `${basePath}/api`,
      admin: `${basePath}/admin`,
      graphQL: `${basePath}/graphql`,
      graphQLPlayground: `${basePath}/graphql-playground`,
    },
  });

});

