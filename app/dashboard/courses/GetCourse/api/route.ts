import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try{
        const courses = await prisma.course.findMany({
            include: {
                modules: {
                    include: {
                        lectures: true
                    }
                },
                links: true
            },
            take: 10
        })

        return NextResponse.json(courses)
    }catch(e: any){
        return NextResponse.json(
            { error: e.message },
            { status: e.status || 500 }
        )
    }
}