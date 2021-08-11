import { prisma } from '../signup';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../lib/auth';

type User = {
  email: string;
  password: string;
};

export default NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    Providers.Credentials({
      async authorize(credentials: User) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error('Unable to Login');
        }

        const isMatch = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          throw new Error('Unable to Login');
        }

        return { email: user.email };
      },
    }),
  ],
});
