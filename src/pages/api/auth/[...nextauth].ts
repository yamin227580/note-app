import { config } from "@/utils/config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
    // ...add more providers here
  ],
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  // },
};

export default NextAuth(authOptions);
