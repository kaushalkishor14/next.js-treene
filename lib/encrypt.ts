import 'server-only';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';

export interface SessionData extends JWTPayload {
    sessionId: string;
    expiresAt: Date; // or use string if you're passing as ISO string
    [key: string]: unknown; // index signature for JWTPayload conformity
}

const secretKey = process.env.SESSION_SECRET;

if (!secretKey) {
    throw new Error('SESSION_SECRET environment variable is not defined');
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionData) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    if (!session) {
        throw new Error('No session token provided for decryption');
    }

    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.error('Failed to verify session:', error);
        throw error; // Optionally rethrow to handle it further up
    }
}
