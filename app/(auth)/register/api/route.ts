import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { createAccessToken, createRefreshToken } from "@/service/tokenService";
import {cookies} from 'next/headers';
import { encrypt } from "@/lib/encrypt";


export async function POST(request: NextRequest) {
    try {
        const { email, password, name, specialKey } = await request.json();

        const userExist = await prisma.account.findUnique({ where: { email } });
        if(userExist) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 });
        }

        if(specialKey !== process.env.SPECIAL_KEY) {
            return NextResponse.json({ error: "Invalid special key" }, { status: 400 });
        }

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create the user
        const user = await prisma.account.create({
            data: {
                email,
                password: hashedPassword,
                role : 'admin',
                name: name,
                isAdmin: true,
            },
        });

        // Generate access and refresh tokens
        const accessToken = createAccessToken(email, user.id);
        const refreshToken = createRefreshToken(user.id);

        // Create a session in the database
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week
        const session = await prisma.session.create({
            data: {
                userId: user.id,
                refreshToken,
                expiresAt,
            },
        });

        // Set cookies
        const encryptedSessionId = await encrypt({ sessionId: session.id, expiresAt , userId: user.id });

        // Store the session ID and tokens in cookies
        const cookieStore = await cookies();
        cookieStore.set('session', encryptedSessionId, {
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

        return NextResponse.json({ message: "Signup successful.", accessToken }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as any)?.message || "sign up failed" }, { status: 500 });
    }
}
