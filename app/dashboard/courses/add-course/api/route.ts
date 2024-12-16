
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export const config = {
  api: {
    bodyParser: false,
  },
};


interface Link {
  key: string;
  url: string;
}

interface LearningPoint {
  point: string;
}

interface Lecture {
  name: string;
}

interface Module {
  moduleName: string;
  tags: string[];
  lectures: Lecture[];
}

interface CourseData {
  imageUrl: string;
  name: string;
  description: string;
  username: string;
  startDate: string;
  endDate: string;
  language: string;
  price: number;
  learningPoints: LearningPoint[];
  modules: Module[];
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await prisma.course.create({
      data: {
        image: data.imageUrl,
        name: data.name,
        description: data.description,
        username: data.username,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        language: data.language,
        price: parseFloat(data.price),
        learningPoints: data.learningPoints.map((lp: LearningPoint) => lp.point),
        modules: {
          create: data.modules.map((module: Module) => ({
            moduleName: module.moduleName,
            tags: module.tags,
            lectures: {
              create: module.lectures.map((lecture: Lecture) => ({
                name: lecture.name
              }))
            }
          }))
        },
        links: {
          create: data.links.map((link: Link) => ({
            name: link.key,
            url: link.url
          }))
        }
      }
    });
    console.log("Course created:", result);
    return NextResponse.json( { message: 'Course uploaded successfully' , data:result }, { status: 200 });
  } catch(error) {
    return NextResponse.json( { message: (error as any)?.message }, { status: 500 });
  }
}