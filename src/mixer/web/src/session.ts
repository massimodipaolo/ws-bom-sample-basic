// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { IUser } from '@websolutespa/bom-mixer-models';
import { IronSessionOptions } from 'iron-session/edge';

const COOKIE_PASSWORD = process.env.SECRET_COOKIE_PASSWORD as string || '12345678901234567890123456789012';
const COOKIE_NAME = '@websolutespa/next.js';

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: IUser;
    cart?: any;
    checkout?: any;
  }
}

export const sessionOptions: IronSessionOptions = {
  password: COOKIE_PASSWORD,
  cookieName: COOKIE_NAME,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
