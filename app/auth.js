import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
//import GoogleProvider from 'next-auth/providers/google';
import { authConfig } from './auth.config';
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
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
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
        token.isAdmin = user.isAdmin;
        token.id = user._id; // <- Parece que se vincula correctamente en MongoDb
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.username = token.username;
        session.img = token.img;
        session.isAdmin = token.isAdmin;
        session.id = token.id;
      }
      return session;
    },
  },
});
