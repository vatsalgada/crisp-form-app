import prisma from '@/prisma/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import Google from 'next-auth/providers/google';
import { signIn } from 'next-auth/react';
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from 'next-auth/adapters';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authOptions : any= {
  adapter: PrismaAdapter(prisma as any) as Adapter,
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: 'email', type: 'text', placeholder: '' },
            password: { label: 'password', type: 'password', placeholder: '' },
          },
          async authorize(credentials: any) {
              return {
                  id: '8',
                  email: credentials.username,
                  password: credentials.password,
              }; 
          },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
            }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt", // Use JWT strategy for Credentials Provider
    },
    callbacks: {

      async session({ session, token }: { session: any; token: JWT }): Promise<Session> {
        //console.log(token)
        if (session.user && token) {
          session.user.id = token.sub ?? '';
        }
        return session;
      },

      async jwt({ token, user }: { token: JWT; user: any }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
   
      async redirect({ url, baseUrl } : any) {
        // If you have a specific URL you want to redirect to after sign-in
        // you can set it here.
        // if (url === '/signin') {
        //   // For example, redirect to the homepage or a dashboard
        //   return baseUrl;
        // }
        // return url.startsWith(baseUrl) ? url : baseUrl;
        return baseUrl;
      },
    },
   
    // pages: {
    //     signIn: '/signin',
    // }
  }



  //google: https://console.developers.google.com/apis/credentials + https://developers.google.com/identity/protocols/oauth2