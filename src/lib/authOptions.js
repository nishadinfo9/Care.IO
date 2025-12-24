import { loggedInUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await loggedInUser({ email, password });
        if (!user) return null;

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const userCollection = await dbConnect(collections.USERS);
      const existUser = await userCollection.findOne({ email: user.email });

      if (existUser) return true;

      const newUser = {
        name: user.name,
        email: user.email,
        image: user.image || "",
        provider: account.provider,
        contact: "",
        nidNo: "",
        role: "user",
      };

      const googleUser = await userCollection.insertOne(newUser);
      if (!googleUser.insertedId) return false;
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (token?.role) session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
  },
};
