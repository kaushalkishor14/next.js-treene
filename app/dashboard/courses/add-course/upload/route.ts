import path from 'path';
import fs from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const file: File | null = data.get('image') as unknown as File;

        if (!file) {
            return NextResponse.json(
                { message: 'No file uploaded' },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), 'public/uploads');
        await fs.mkdir(uploadDir, { recursive: true });

        const filename = file.name;
        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);

        const relativeFilePath = path.relative(path.join(process.cwd(), 'public'), "/"+filePath);

        // console.log("File uploaded to: ", relativeFilePath);

        return NextResponse.json(
            { message: 'File uploaded successfully', filePath: relativeFilePath,  status: 200 },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Error uploading file' },
            { status: 500 }
        );
    }
}