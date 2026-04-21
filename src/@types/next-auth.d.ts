import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    accessToken?: string;
    expiresIn?: number;
    profileImageUrl?: string | null;
    profileImagePublicId?: string | null;
    role?: string;
    teacher?: {
      firstName: string;
      lastName: string;
    };
    parent?: {
      firstName: string;
      lastName: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    accessToken?: string;
    expiresIn?: number;
    profileImageUrl?: string | null;
    profileImagePublicId?: string | null;
    sub: string;
    accessTokenExpiresAt?: number;
    role?: string;
    teacher?: {
      firstName: string;
      lastName: string;
    };
    parent?: {
      firstName: string;
      lastName: string;
    };
  }
}
