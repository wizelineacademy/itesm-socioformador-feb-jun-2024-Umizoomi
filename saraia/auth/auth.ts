import NextAuth from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { compare } from "bcrypt";
import { User } from "@/types/next-auth";
import { sql } from "drizzle-orm";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [CredentialsProvider({
    credentials: {
        email: { type: 'text' },
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
                    id: user.id_user as number, 
                    email: user.email as string, 
                    name: user.username as string, 
                } as User; 
            } else {
                throw new Error("Incorrect password");
            }
        } catch (error) {
            console.error("Authorization error:", error);
            return null; // Return null in case of any errors during authorization
        }
    },
}),],
})