import { NextResponse , NextRequest} from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { team, userteamposition } from "@/lib/schema";

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("userId");
    console.log(userId);
    const teamNames = await db
            .select({nombre: team.teamName})
            .from(team)
            .innerJoin(userteamposition, eq(userteamposition.idTeam, team.idTeam))
            .where(eq((userteamposition.idUser) , 7))

    return NextResponse.json(teamNames);
}