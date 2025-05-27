// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = [
          { id: 1, name: "Admin", username: "admin", password: "admin123", role: "admin" },
          { id: 2, name: "User", username: "user", password: "user123", role: "user" },
        ];

        const user = users.find(
          (u) => u.username === credentials?.username && u.password === credentials?.password
        );

        return user ?? null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // ✅ Needs leading slash
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
