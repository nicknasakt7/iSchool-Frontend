import { authService } from '@/lib/api/auth/auth.service';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const result = await authService.login(credentials);
        const { user, accessToken, expiresIn } = result;
        console.log('result', result);
        // console.log('  teacher: user.teacher', user.teacher);
        return {
          ...user,
          accessToken,
          expiresIn,
          teacher: user.teacher,
          parent: user.parent,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      // console.log('token', token)
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.image = user.image;
        token.role = user.role;
        token.profileImageUrl = user.profileImageUrl;

        token.teacher = user.teacher;

        token.parent = user.parent;

        token.accessTokenExpiresAt =
          Date.now() + ((user.expiresIn ?? 0) - 3) * 1000;
      }

      if (
        token.accessTokenExpiresAt &&
        Date.now() > token.accessTokenExpiresAt
      ) {
        return null;
      }

      if (trigger === 'update' && session) {
        token.avatarUrl = session.user.avatarUrl;
      }

      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.email = token.email as string;
      session.user.image = token.picture as string;
      session.user.firstName = token.firstName as string;
      session.user.lastName = token.lastName as string;
      session.user.id = token.sub;
      session.user.role = token.role as string;
      session.user.profileImageUrl = token.profileImageUrl;

      session.user.teacher = token.teacher;
      // console.log('session', session)

      session.user.parent = token.parent;
      return session;
    },
  },
});
