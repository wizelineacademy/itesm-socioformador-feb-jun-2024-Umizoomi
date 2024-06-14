'use server'

import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth/auth";
import { sql } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { teamId, userId } = body;
        const idTeam = parseInt(teamId);
        const userIdParsed = userId as string;

        await db.execute(sql`INSERT INTO userteamposition (id_user, id_team, id_jobtitle) VALUES (${userIdParsed}, ${idTeam}, 2)`);

        return NextResponse.json({ message: "User added to team successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error adding team member:", error);
        return NextResponse.json({ error: "Failed to add team member" }, { status: 500 });
    }
}
