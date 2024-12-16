import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword } from '@/lib/auth';
import { createAccessToken, createRefreshToken } from "@/service/tokenService";
import { cookies } from 'next/headers';
import { encrypt } from "@/lib/encrypt";  // Utility function for encrypting session data

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        
        if (!email || !password) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const user = await prisma.account.findUnique({
            where: { email },
        });

        // Check if user exists and if the password is correct
        if (!user || !(await verifyPassword(password, user.password))) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }

        // Check if user is an admin
        if (!user.isAdmin) {
            return NextResponse.json({ error: "Access denied: Admins only." }, { status: 403 });
        }

        // Generate access and refresh tokens
        const accessToken = createAccessToken(email, user.id);
        const refreshToken = createRefreshToken(user.id);

        // Create a session in the database
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week
        const session = await prisma.session.create({
            data: {
                userId: user.id, // Save user ID in the session
                expiresAt,
                refreshToken, // Save refresh token in the session
            },
        });

        // Encrypt session ID to store it in the cookie
        const encryptedSessionId = await encrypt({ sessionId: session.id, expiresAt , userId: user.id });

        // Store the session ID and tokens in cookies
        const cookieStore = await cookies();
        cookieStore.set('session', encryptedSessionId , {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: 'lax',
            path: '/',
        });

        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            sameSite: 'lax',
            path: '/',
        });

        return NextResponse.json({ message: "Login successful.", accessToken }, { status: 200 });
        
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
}
