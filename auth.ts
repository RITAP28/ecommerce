import NextAuth, { CredentialsSignin } from "next-auth"
import credentials from "next-auth/providers/credentials" 
import { prisma } from "./db";
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(Prisma),
  providers: [
    credentials({
        name: "Credentials",
        credentials: {
            email: {
                label: "Email",
                type: "email"
            },
            password: {
                label: "Password",
                type: "password"
            }
        },
        authorize: async (credentials) => {
            const email = credentials.email as string | undefined;
            const password = credentials.password as string | undefined;

            if(!email || !password){
                throw new CredentialsSignin("All fields are required");
            };

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            if(!user){
                throw new CredentialsSignin("Invalid credentials");
            };

            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword){
                throw new CredentialsSignin("Invalid Password");
            };

            return {
                name: user.username,
                email: user.email,
                id: user.id.toString()
            };
        },
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
})