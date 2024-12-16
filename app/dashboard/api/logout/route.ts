import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from 'next/headers';
import { decrypt } from "@/lib/encrypt";

export async function POST(request: NextRequest) {

    try {
        console.log('API logout invoked');
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (sessionCookie) {
            // Decrypt session ID (if encrypted) and find the session in the database
            const decryptedSession = await decrypt(sessionCookie.value);  // Add decrypt function
            const sessionId = decryptedSession.sessionId as string;
            
            await prisma.session.delete({
                where: { id: sessionId },
            });

        }

        // Clear session and refresh token cookies
        cookieStore.delete('session');
        cookieStore.delete('refreshToken');
        cookieStore.delete('accessToken');

        return NextResponse.json({ message: "Logout successful." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to log out." }, { status: 500 });
    }
}
