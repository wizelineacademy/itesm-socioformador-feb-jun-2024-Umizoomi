import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { team , userteamposition} from "@/lib/schema";
export async function POST(request: NextRequest) {
    try {

        const { name } = await request.json();

        if (!name || typeof name !== 'string') {
            return NextResponse.json({ error: "Team name is required and must be a string" }, { status: 400 });
        }

        await db.insert(team).values({ teamName: name });

        return NextResponse.json({ message: "Team added successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error adding team:", error);
        return NextResponse.json({ error: "Failed to add team" }, { status: 500 });
    }
}
