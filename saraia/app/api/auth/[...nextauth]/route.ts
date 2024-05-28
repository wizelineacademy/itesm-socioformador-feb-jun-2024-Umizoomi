import NextAuth, { NextAuthOptions, Session, User, JWT } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import * as schema from '@/lib/schema';

const options: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.id as number;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { type: 'text' }, // Specify type as "text"
                password: { type: 'password' },
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials || !credentials.email || !credentials.password) {
                        throw new Error("Missing credentials");
                    }

                    const response = await db.execute(sql`SELECT * FROM users WHERE email=${credentials.email}`);
                    const user = response.rows[0];
                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    const password = user.password as string;
                    const passwordCorrect = await compare(credentials.password, password);
                    if (passwordCorrect) {
                        return {
                            id: user.id_user as number, // Cast to string
                            email: user.email as string, // Cast to string
                            name: user.username as string, // Cast to string
                        } as User; // Ensure the return type matches User
                    } else {
                        throw new Error("Incorrect password");
                    }
                } catch (error) {
                    console.error("Authorization error:", error);
                    return null; // Return null in case of any errors during authorization
                }
            },
        }),
    ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
