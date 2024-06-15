
'use server'
 
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import {sql } from "drizzle-orm";

export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await request.json();
        await db.execute(sql`CALL deleteteammember(${userId});`);
        

        return NextResponse.json({ message: "Team added successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error adding team:", error);
        return NextResponse.json({ error: "Failed to add team" }, { status: 500 });
    }
}
