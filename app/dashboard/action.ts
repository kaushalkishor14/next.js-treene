'use server';
import prisma from "@/lib/prisma";
import { cookies } from 'next/headers';
import { decrypt } from "@/lib/encrypt";

export async function getUserData() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (sessionCookie) {
      const decryptedSession = await decrypt(sessionCookie.value); 
      const userId = decryptedSession.userId as string;
      const data = await prisma.account.findUnique({
        where: { id: userId },
      });
      return data;
    }
  }