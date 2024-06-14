import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { auth } from "@/auth/auth";

export async function PUT(request: NextRequest) {
    try {
        const session = await auth();
        const userId = session?.user?.id;
        const { username } = await request.json();
        await db.update(users)
        .set({ name: username })
        .where(eq(users.id, userId as string));

        return NextResponse.json({ message: 'Username updated successfully' });
    } catch (error) {
        console.error("Error updating username:", error);
        return NextResponse.json({ error: "Failed to update username" }, { status: 500 });
    }
}
