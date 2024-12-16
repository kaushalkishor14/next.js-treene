import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyRefreshToken, createAccessToken, createRefreshToken } from "@/service/tokenService";
import {cookies} from 'next/headers';

export async function GET(req: NextRequest) {
    try {

        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refreshToken')?.value;
        if (!refreshToken) {
            return NextResponse.json({ error: "No refresh token provided." }, { status: 401 });
        }

        // Verify the refresh token
        const tokenPayload = verifyRefreshToken(refreshToken);
        const userId = typeof tokenPayload === 'string' ? tokenPayload : tokenPayload?._id;

        if (!userId) {
            return NextResponse.json({ error: "Invalid refresh token." }, { status: 403 });
        }

        // Generate new access and refresh tokens
        const user = await prisma.account.findUnique({ where: { id: userId } });
        if(user?.email || user?.id) {
            const newAccessToken = createAccessToken(user?.email, user?.id);
            const newRefreshToken = createRefreshToken(userId);

            await prisma.session.update({
                where: { refreshToken },
                data: { refreshToken: newRefreshToken },
            });
    
            // Set the new tokens in cookies
            cookieStore.set('accessToken', newAccessToken, { httpOnly: true, path: '/' });
            cookieStore.set('refreshToken', newRefreshToken, { httpOnly: true, path: '/' });
    
            return NextResponse.json(
                { message: "Token refreshed.", accessToken: newAccessToken }, 
                {
                    status: 200,
                    headers: {
                        'accessToken': `accessToken=${newAccessToken}; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=${60 * 15}`,
                        'Set-Cookie': `refreshToken=${newRefreshToken}; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=${60 * 60 * 24 * 7}`,
                    },
                }
            );
        }

        // Update the session in the database with the new refresh token
        NextResponse.json({ error: "User not found." }, { status: 404 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
    }
}
