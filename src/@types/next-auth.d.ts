import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    firstName?:string;
    lastName?:string;
    email?: string;
    password?: string;
    accessToken?: string;
    expiresIn?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    firstName?:string;
    lastName?:string;
    email?: string;
    password?: string;
    accessToken?: string;
    expiresIn?: number;
    sub: string;
    accessTokenExpiresAt?: number;
  }
}
