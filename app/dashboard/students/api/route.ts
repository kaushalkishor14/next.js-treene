import prisma from "@/lib/prisma";
import { NextResponse , NextRequest} from "next/server";

export async function GET(request: Request) {    
    const studentsRegistration = await prisma.courseRegistration.findMany({
        take: 10,
    });

    return NextResponse.json(studentsRegistration, { status: 200 });
}   