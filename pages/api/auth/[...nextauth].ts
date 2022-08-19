import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import clientPromise from '../../../lib/mongodb'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await dbConnect()

        // Find user with the email
        const user = await User.findOne({
          email: credentials?.email,
        })

        // Email Not found
        if (!user) {
          throw new Error("Email is not registered");
        }

        // Check hased password with DB hashed password
        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.password
        )

        // Incorrect password
        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async jwt({ token, user, account, profile, isNewUser }) {
    //     user && (token.user = user)
    //     return token
    //   },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    },
    async session({ session, token }) {
      await dbConnect()
      const user = await User.findOne({
        email: session.user.email,
      })
        session = {
            ...session,
            user: {
              ...session.user,
              _id: user._id  
            }
        }
        return session
      }
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt"
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
})