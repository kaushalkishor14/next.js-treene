import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function GET(req: NextRequest) {
    try{
        const name = req.nextUrl.searchParams.get('name');
        if (!name) {
            return NextResponse.json(
                { message: 'Name parameter is required' },
                { status: 400 }
            );
        }
        const course = await prisma.course.findFirst({
            where: { name },
            include: {
                links: true,
                modules: {
                    include:{
                        lectures : true
                    }
                }
            }
        });
        return NextResponse.json(
            { course },
            { status: 200 }
        );
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : 'Error getting course';
        return NextResponse.json(
            { message: errorMessage },
            { status: 500 }
        );
    }
}
  
