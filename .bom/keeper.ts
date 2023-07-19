import { getKeeperSecrets } from '@websolutespa/dotenv-keeper';

let token: string | undefined = undefined;

if (process.argv.includes('token')) {
  token = process.argv[process.argv.indexOf('token') + 1];
}

getKeeperSecrets(token);
