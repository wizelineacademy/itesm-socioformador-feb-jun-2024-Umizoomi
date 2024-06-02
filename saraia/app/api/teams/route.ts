import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { team, userteamposition } from "@/lib/schema";

export async function GET(request: NextRequest) {
    try {
        // Get the userId from the query parameters
        const userId = request.nextUrl.searchParams.get("userId");

        // Ensure userId is a valid number
        if (!userId || isNaN(Number(userId))) {
            return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
        }

        // Convert userId to a number
        const userIdNumber = Number(userId);

        // Perform the database query
        const teamNames = await db
            .select({ nombre: team.teamName })
            .from(team)
            .innerJoin(userteamposition, eq(userteamposition.idTeam, team.idTeam))
            .where(eq(userteamposition.idUser, userIdNumber));

        // Return the results as a JSON response
        return NextResponse.json(teamNames);
    } catch (error) {
        // Handle any errors that occur during the query execution
        console.error("Error fetching team names:", error);
        return NextResponse.json({ error: "Failed to fetch team names" }, { status: 500 });
    }
}
