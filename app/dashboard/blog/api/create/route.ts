import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if(!data.title || !data.author || !data.blocks){
        return NextResponse.json({ message: 'Please provide all required fields' }, { status: 400 });
    }

    const blogData = await prisma.blog.findFirst({
        where: {
            title: data.title,
        },
    });
    if(blogData){
        return NextResponse.json({ message: 'Blog with this title already exists' }, { status: 400 });
    }
    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        author: data.author,
        blocks: {
          create: data.blocks.map((block:any) => ({
            // id: block.id, // You can omit this if you want Prisma to generate the ID
            type: block.type,
            content: block.content,
            language: block.language,
          })),
        },
      },
    });

    return NextResponse.json({
      message: "Blog successful save",
      blog,
      status: 200,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
