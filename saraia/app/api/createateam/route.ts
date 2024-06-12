
'use server'
 
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { team, userteamposition } from "@/lib/schema";
import { getToken } from "next-auth/jwt";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/auth/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        const { name } = await request.json();

        if (!name || typeof name !== 'string') {
            return NextResponse.json({ error: "Team name is required and must be a string" }, { status: 400 });
        }
        console.error("Error adding team:", name);

        await db.execute(sql`CALL CreateTeam(${name}, ${session?.user.id});`);
        

        return NextResponse.json({ message: "Team added successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error adding team:", error);
        return NextResponse.json({ error: "Failed to add team" }, { status: 500 });
    }
}
