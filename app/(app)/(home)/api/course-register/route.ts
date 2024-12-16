import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    console.log('API course-register invoked'); // Log when the API is hit
    try {
        const data = await req.json().catch(() => {
            return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
        });
        if (!data) return;

        const { name, email, course, phone, futureGoals } = data;

        // Validate input data
        if (!name || !email || !course || !phone || !futureGoals) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        // Check if email is already registered
        const existingRegistration = await prisma.courseRegistration.findUnique({
            where: { email },
        });

        if (existingRegistration) {
            return NextResponse.json({ error: "Email already registered." }, { status: 400 });
        }

        // Create a new course registration record in the database
        const registration = await prisma.courseRegistration.create({
            data: { name, email, course, phone, futureGoals },
        });

        return NextResponse.json(registration, { status: 201 });
    } catch (error: any) {
        console.error("Error during course registration:", error);

        if (error.code === 'P2002') { // Unique constraint violation
            return NextResponse.json({ error: "Email already exists." }, { status: 400 });
        }

        return NextResponse.json({ error: "Failed to register course" }, { status: 500 });
    }
}
