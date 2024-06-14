import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { team, userteamposition } from "@/lib/schema";
import { auth } from "@/auth/auth";

export async function GET(request: NextRequest) {
    try {
        // Get the userId from the query parameters
        const session = await auth();
        // Ensure userId is a valid number


        // Convert userId to a number
        const userId = session?.user?.id as string;

        // Perform the database query
        const teamNames = await db
        .select({
            nombre: team.teamName,
            id: team.idTeam
          })
            .from(team)
            .innerJoin(userteamposition, eq(userteamposition.idTeam, team.idTeam))
            .where(eq(userteamposition.idUser, userId));

        // Return the results as a JSON response
        return NextResponse.json(teamNames);
    } catch (error) {
        // Handle any errors that occur during the query execution
        console.error("Error fetching team names:", error);
        return NextResponse.json({ error: "Failed to fetch team names" }, { status: 500 });
    }
}
