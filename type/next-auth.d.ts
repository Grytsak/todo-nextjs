import NextAuth, { DefaultSession } from "next-auth"
import { Types } from 'mongoose'

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      _id: Types.ObjectId
    } & DefaultSession["user"]
  }
}