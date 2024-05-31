// lib/auth.ts
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { db } from "./db";
import type { Adapter } from 'next-auth/adapters';
import { Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

interface SessionCallbackParams {
    session: Session;
    user: User | AdapterUser;
}

export const authOptions = {
    adapter: DrizzleAdapter(db) as Adapter,
    providers: [], // No providers
    callbacks: {
        async session({ session, user }: SessionCallbackParams) {
            return session;
        },
    },
};

export default NextAuth(authOptions);
