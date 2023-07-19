import { ICategorized, IMedia } from '@websolutespa/bom-core';
import { ILazyComponent } from '@websolutespa/bom-mixer-models';

export type IHomepage = ICategorized & {
  slug: string;
  title: string;
  abstract?: string;
  media?: IMedia;
  components: ILazyComponent[];
  href?: string;
};
