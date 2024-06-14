'use server'

import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth/auth";
import { sql } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        const { teamId, userId } = await request.json();

        if (!teamId || !userId || typeof teamId !== 'number' || typeof userId !== 'string') {
            return NextResponse.json({ error: "Team ID and User ID are required" }, { status: 400 });
        }

        await db.execute(sql`INSERT INTO userteamposition (id_user, id_team, id_jobtitle) VALUES (${userId}, ${teamId}, 2) ON CONFLICT DO NOTHING
        `);

        return NextResponse.json({ message: "User added to team successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error adding team member:", error);
        return NextResponse.json({ error: "Failed to add team member" }, { status: 500 });
    }
}
