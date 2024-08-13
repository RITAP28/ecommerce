import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const hashedPassword = async (password: string) => {
    const hashPwd = await bcrypt.hash(password, 10);
    return hashPwd;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    providers: [
        Credentials({
            credentials: {
                username: {},
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                let user = null;
                const pwHash = hashedPassword(credentials.password as string);
            }
        })
    ]
});