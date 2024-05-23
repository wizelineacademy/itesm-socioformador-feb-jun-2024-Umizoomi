import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import {db} from "./db"
import type { Adapter } from 'next-auth/adapters';

export const {
    handlers: {GET,POST},
    auth,

} = NextAuth ({
    adapter: DrizzleAdapter(db),
    callbacks: {
        async session({session, user, token}) {
            return session;
        },
    },
});