import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt';
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import * as schema from '@/lib/schema';

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy:"jwt"
    },
    pages: {
        signIn: '/login',
    },
    callbacks:{
        session: async ({ session, token }) => {
            if (session?.user) {
              session.user.id = token.sub;
              session.user.email = token.email || '';
              session.user.name = token.name || '';

            }
            return session;
          },
          jwt: async ({ user, token }) => {
            if (user) {
              token.uid = user.id;
            }
            return token;
          },
    },

    providers: [
        CredentialsProvider({
            credentials: {
                email: {}, // Specify type as "text"
                password: {},
            },
            async authorize(credentials, req) : Promise<any> {
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
                            id: user.id_user,
                            email: user.email,
                            name: user.username,
                        };
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
});

export { handler as GET, handler as POST };
