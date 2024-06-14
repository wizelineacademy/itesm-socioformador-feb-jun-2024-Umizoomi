import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth/auth";

export async function GET(request: NextRequest) {
    try {
        // Authenticate the user
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Extract user ID from session
        const userId = session.user.id;

        // Return the user ID as JSON
        return NextResponse.json({ userId: userId });
    } catch (error) {
        console.error("Error fetching user ID:", error);
        return NextResponse.json({ error: "Failed to fetch user ID" }, { status: 500 });
    }
}
