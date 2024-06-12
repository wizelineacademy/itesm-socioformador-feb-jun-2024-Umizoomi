'use server'
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const messageResult = await db.execute(sql`SELECT message FROM messages WHERE id_user = 1 AND id_team = 21 ORDER BY messagedate DESC LIMIT 1;`);
        const message = messageResult.rows[0].message;

        return NextResponse.json({ message });
    } catch (error) {
        console.error("Error retrieving message:", error);
        return NextResponse.json({ error: "Failed to retrieve message" }, { status: 500 });
    }
}
