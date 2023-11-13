// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";
import { User as PrismaUser } from "@prisma/client"; // Assuming your Prisma User model is named 'User'

declare module "next-auth" {
  interface Session {
    user: {
      firstname?: string;
      lastname?: string;
      emailVerified?: boolean;
      testSession?: string;
      // Add more attributes from Prisma User model
      prismaUserAttribute?: string;
    } & DefaultSession["user"];
  }

  interface User extends PrismaUser {
    // Add more attributes from Prisma User model
    prismaUserAttribute?: string;
    testuser?: string;
  }
  interface Profile {
    iss?: string,
    azp?: string,
    aud?: string,
    sub?: string,
    email?: string,
    email_verified?: boolean,
    at_hash: string,
    name: string,
    picture: string,
    given_name: string,
    family_name: string,
    locale: string,
    iat: number,
    exp: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    image?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    token: string;
    exp?: number;
    iat?: number;
    jti?: string;
    testJWT?: string;
  }
}
