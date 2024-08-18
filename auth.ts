import NextAuth, { CredentialsSignin } from "next-auth"
import credentials from "next-auth/providers/credentials" 
import { prisma } from "./db";
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
            const email = credentials.email as string;
            const password = credentials.password as string;

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
                id: String(user.id)
            };
        },
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
        if(user){
            token.id = user.id as string;
        };
        return token;
    },
    async session({ session, token }) {
        if(token){
            session.user.id = token.id as string;
        };
        return session;
    },
  }
})