import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { users, team, userteamposition } from "@/lib/schema";

export async function GET(request: NextRequest) {
    try {

        // Get the userId from the query parameters
        const teamId = request.nextUrl.searchParams.get("teamid");

        // Ensure userId is a valid number
        if (!teamId || isNaN(Number(teamId))) {
            return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
        }

        // Convert userId to a number
        const teamIdNumber = Number(teamId);

        // Perform the database query
        const teamNames = await db.execute(sql`SELECT t2.id_user, t1.username, t3.title AS "job_title", t4.team_name, COALESCE(sub.overall_average, 0) AS overall_average FROM users t1 INNER JOIN userteamposition t2 ON t1.id_user = t2.id_user INNER JOIN jobtitles t3 ON t2.id_jobtitle = t3.id_jobtitle INNER JOIN team t4 ON t2.id_team = t4.id_team LEFT JOIN (SELECT id_user, (AVG(performance) + AVG(well_being) + AVG(flow) + AVG(communication) + AVG(proactivity) + AVG(collaboration) + AVG(efficiency) + AVG(satisfaction)) / 8 AS overall_average FROM feedback GROUP BY id_user) sub ON t2.id_user = sub.id_user WHERE t2.id_team = 21;
        `);
        console.log(teamNames)

        // Return the results as a JSON response
        return NextResponse.json(teamNames);
    } catch (error) {
        // Handle any errors that occur during the query execution
        console.error("Error fetching team names:", error);
        return NextResponse.json({ error: "Failed to fetch team names" }, { status: 500 });
    }
}
