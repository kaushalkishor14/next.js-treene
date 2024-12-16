

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

type EmailOptions = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: EmailOptions): Promise<void> => {
  try {
    // Send the email
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Replace with your verified sender email
      to,
      subject,
      html,
    });
    console.log("Email sent successfully",to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
