import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db"; 
import { auth } from "@/auth/auth";
import { feedback } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        const userFeedback = await db
            .select({
                performance: feedback.performance,
                wellBeing: feedback.wellBeing,
                flow: feedback.flow,
                communication: feedback.communication,
                activity: feedback.activity,
                collaboration: feedback.collaboration,
                efficiency: feedback.efficiency,
                satisfaction: feedback.satisfaction,
            })
            .from(feedback)
            .where(eq(feedback.idUser, userId))

        return NextResponse.json(userFeedback[0]);
    } catch (error) {
        console.error("Error fetching user feedback:", error);
        return NextResponse.json({ error: "Failed to fetch user feedback" }, { status: 500 });
    }
}
