
'use server'
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db"; 
import {sql } from "drizzle-orm";
import { auth } from "@/auth/auth";
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        const { message } = await request.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json({ error: "Team name is required and must be a string" }, { status: 400 });
        }

        await db.execute(sql`INSERT INTO user_messages (message, id_user, id_team) VALUES ('Hello', 1, 21)`);


        return NextResponse.json({ message: "Team added successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error adding team:", error);
        return NextResponse.json({ error: "Failed to add team" }, { status: 500 });
    }
}
