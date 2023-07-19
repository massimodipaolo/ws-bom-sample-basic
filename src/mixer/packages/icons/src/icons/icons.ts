// https://github.com/feathericons/react-feather

import { lazy } from 'react';

export * from './webhook';
export * from './websolute';

export const Icons = {
  IconWebhook: lazy(() => import('./webhook').then( module => ({ default: module.IconWebhook }) )),
  IconWebsolute: lazy(() => import('./websolute').then( module => ({ default: module.IconWebsolute }) ))
};
