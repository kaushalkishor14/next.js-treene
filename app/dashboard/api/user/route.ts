import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/encrypt"; // Make sure this function is async if it returns a Promise
import { cookies } from "next/headers";


export async function GET(req: NextRequest) {
    try {
        // Access cookies to get the session
        const cookieStore = await cookies(); // Await the cookies
        const sessionCookie = cookieStore.get('session');

        // Check if session cookie exists
        if (!sessionCookie) {
            return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
        }

        // Decrypt the session ID from the cookie
        const sessionData= await decrypt(sessionCookie.value); 

        const sessionId = sessionData.sessionId as string;
            

        // Fetch user from the database using session ID
        const session = await prisma.session.findUnique({
            where: {
                id: sessionId, // Now you can safely access sessionId
            },
            include: {
                user: true, // Include related user data
            },
        });

        // Check if the session exists
        if (!session) {
            return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
        }

        // Return user data
        return NextResponse.json({
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
        }, {
            status: 200,
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ error: "User not authenticated." }, { status: 401 });
    }
}
