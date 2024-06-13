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
    providers:[Resend({
        apiKey: process.env.AUTH_RESEND_KEY,
        id:'email',
        name:'email',
        server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
            }
        },
        from:process.env.EMAIL_FROM,
    }
)], 
})