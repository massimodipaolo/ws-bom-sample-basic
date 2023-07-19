import { ILazyModules } from '@websolutespa/bom-mixer-models';
import dynamic from 'next/dynamic';
import { DescriptionProps } from '../components/description/description';

export const LAZY_MODULES: ILazyModules = {
  'description-1': dynamic<DescriptionProps>(() => import('../components/description/description').then(
    module => module.Description
  )),
};
