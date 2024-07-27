// import prisma from '@/prisma/prisma';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import Google from 'next-auth/providers/google';
// import { signIn } from 'next-auth/react';


// export const authOptions = {
//   adapter: PrismaAdapter(prisma) as any,
//     providers: [
//       CredentialsProvider({
//           name: 'Credentials',
//           credentials: {
//             username: { label: 'email', type: 'text', placeholder: '' },
//             password: { label: 'password', type: 'password', placeholder: '' },
//           },
//           async authorize(credentials: any) {
              
//               return {
//                   id: "324",
//                   email: credentials.username,
//                   password: credentials.password,
//               }; 
//           },
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID || '',
//             clientSecret: process.env.GOOGLE_SECRET || '',
//             }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     callbacks: {
//       async session({ session, user, token }: any): Promise<any> {
//           if(session && session.user) {
//               session.user.id = token.sub;
//               return session;
//           }
//       },
//       async redirect({ url, baseUrl } : any) {
//         // If you have a specific URL you want to redirect to after sign-in
//         // you can set it here.
//         // if (url === '/signin') {
//         //   // For example, redirect to the homepage or a dashboard
//         //   return baseUrl;
//         // }
//         // return url.startsWith(baseUrl) ? url : baseUrl;
//         return baseUrl;
//       },
//     },
   
//     // pages: {
//     //     signIn: '/signin',
//     // }
//   }



//   //google: https://console.developers.google.com/apis/credentials + https://developers.google.com/identity/protocols/oauth2