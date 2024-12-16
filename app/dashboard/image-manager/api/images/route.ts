import { readdir, unlink } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    console.log(uploadDir, "uploadDir")
    const files = await readdir(uploadDir);

    const images = files.map(file => ({
      name: file,
      path: `/uploads/${file}`
    }));

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    
    const { imagePath } = await request.json();
    console.log(imagePath, "imagePath")
    if (!imagePath || imagePath.includes('..')) {
      return NextResponse.json(
        { error: 'Invalid image path' },
        { status: 400 }
      );
    }
    console.log(imagePath, "imagePath")
    const fullPath = path.join(process.cwd(), 'public', 'uploads', imagePath);
    try {
      await unlink(fullPath);
      return NextResponse.json({ success: true });
    } catch (unlinkError) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}