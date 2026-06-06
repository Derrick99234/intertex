import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const secret = process.env.NEXTAUTH_SECRET;
if (!secret) {
  throw new Error(
    "NEXTAUTH_SECRET environment variable is required but not set.",
  );
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).idToken = token.idToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
