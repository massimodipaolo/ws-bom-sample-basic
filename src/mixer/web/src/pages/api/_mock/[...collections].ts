import { mockHandler } from '@websolutespa/bom-mixer-store';
import * as fs from 'fs';
import * as path from 'path';

export default mockHandler(async () => {
  const storePath = path.join(process.cwd(), '.mixer/store.json');
  const storeJson = await fs.promises.readFile(storePath, 'utf8');
  return storeJson;
});
