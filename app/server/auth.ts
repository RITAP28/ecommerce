import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma, Prisma } from "@/db";

const hashedPassword = async (password: string) => {
  const hashPwd = await bcrypt.hash(password, 10);
  return hashPwd;
};

const getUserFromDB = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    throw new Error("No user found with the given email");
  }

  try {
    const validPassword = await bcrypt.compare(existingUser.password, password);

    if(!validPassword){
        throw new Error("Invalid Password");
    };
    return existingUser;
  } catch (error) {
    console.error(error);
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: {
            label: 'Username',
            type: 'username'
        },
        email: {
            label: 'Email',
            type: 'email'
        },
        password: {
            label: 'Password',
            type: 'password'
        },
      },
        authorize: async (credentials) => {
        let user = null;

        if(!credentials.email || !credentials.password){
            return null;
        }

        user = await getUserFromDB(String(credentials.email), String(credentials.password));

        if (user === null) {
          throw new Error("User not found");
        }

        return user;
      },
    }),
  ],
});
