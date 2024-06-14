import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const teamNames = await db.execute(sql`SELECT t1.id AS id_user, COALESCE(t1.name, '') AS name, COALESCE(sub.overall_average, 0) AS overall_average FROM "user" t1 LEFT JOIN (SELECT id_user, (AVG("Performance") + AVG("well_being") + AVG("flow") + AVG("communication") + AVG("activity") + AVG(collaboration) + AVG(efficiency) + AVG(satisfaction)) / 8 AS overall_average FROM feedback GROUP BY id_user) sub ON t1.id = sub.id_user`);


        const formattedTeamNames = teamNames.rows.map((row: any) => ({
            id_user: row.id_user,
            name: row.name,
            job_title: row.job_title,
            team_name: row.team_name,
            overall_average: parseFloat(row.overall_average),
        }));

        return NextResponse.json({ rows: formattedTeamNames });
    } catch (error) {
        console.error("Error fetching team names:", error);
        return NextResponse.json({ error: "Failed to fetch team names" }, { status: 500 });
    }
}
