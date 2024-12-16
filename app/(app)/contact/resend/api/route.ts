// app/(app)/contact/resend/api/route.ts
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';

export async function POST(req: Request) {
  const { email, name, subject, message } = await req.json();

  // checking for empty fields
  if (!email || !name || !subject || !message) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }


  // create a custom email content for the contact form
  const emailContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong><br>${message}</p>
  `;

  try {
    await sendEmail({
      // send the email with the custom content
      to: email,
      subject: `Contact Form Submission: ${subject}`,
      html: emailContent,
    });
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to resend email", error: error instanceof Error ? error.message : '' }, { status: 500 });
  }
}
