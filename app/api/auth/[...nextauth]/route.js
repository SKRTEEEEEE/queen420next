// import { authOptions } from "@/utils/auth";
import { authConfig } from '@/app/auth.config';
import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
