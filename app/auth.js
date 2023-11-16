import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './authconfig';
import { connectToDB } from './lib/utils';
import { UserModel } from './lib/models/userSchema';
import bcrypt from 'bcrypt';

const login = async (credentials) => {
  try {
    connectToDB();
    const user = await UserModel.findOne({ username: credentials.username });

    if (!user) throw new Error('Wrong credentials!');

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error('Wrong credentials!');

    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to login!');
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.img = user.img;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.username = token.username;
        session.img = token.img;
      }
      return session;
    },
  },
});
