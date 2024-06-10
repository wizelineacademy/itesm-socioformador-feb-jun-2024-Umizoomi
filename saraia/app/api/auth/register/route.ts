import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { db } from "@/lib/db";
import * as schema from '@/lib/schema';


export  async function POST(request: Request){
    try {
        const {email,password,username } = await request.json();
        console.log({email,password});

        const hashedPassword = await hash(password, 10);
        await db.insert(schema.users).values({
            email:email,
            password:hashedPassword,
            username:username,
        })
    } catch (e) {
        console.log({e});
    }
    return NextResponse.json({message: 'success'});
}