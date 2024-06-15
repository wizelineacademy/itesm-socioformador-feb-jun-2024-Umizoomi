import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { team, userteamposition } from "@/lib/schema";
import { auth } from "@/auth/auth";
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        const userId = session?.user?.id as string;
        const teamNames = await db
        .select({
            nombre: team.teamName,
            id: team.idTeam
          })
            .from(team)
            .innerJoin(userteamposition, eq(userteamposition.idTeam, team.idTeam))
            .where(eq(userteamposition.idUser, userId));

        return NextResponse.json(teamNames);
    } catch (error) {
        console.error("Error fetching team names:", error);
        return NextResponse.json({ error: "Failed to fetch team names" }, { status: 500 });
    }
}
