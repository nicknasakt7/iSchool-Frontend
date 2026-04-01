import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    email?: string;
    password?: string;
    accessToken?: string;
    expiresIn?: number;
  }
}

// declare module 'next-auth/jwt' {
//   interface JWT {
//     avatarUrl?: string | null;
//     firstName?: string;
//     lastName?: string;
//     accessToken?: string;
//     sub: string;
//     accessTokenExpiresAt?: number;
//   }
// }
