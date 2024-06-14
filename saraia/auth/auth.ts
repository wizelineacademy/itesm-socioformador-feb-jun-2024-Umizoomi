import CredentialsProvider  from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { compare } from "bcrypt";
import { sql } from "drizzle-orm";
import { User } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import * as tables from "@/lib/schema"
import { table } from "console";
import Resend from "next-auth/providers/resend"
import {loadEnvConfig} from "@next/env";
import { config } from "process";
const projectDir = process.cwd();
loadEnvConfig(projectDir);

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    pages: {newUser: "/signup",
    },
    providers:[Resend({
        apiKey: process.env.AUTH_RESEND_KEY,
        from: "sara@saraai.xyz",
    }),
    ],
})