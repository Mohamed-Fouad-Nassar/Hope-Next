import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

import ContactEmailTemplate from "@/emails/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

type TContactEmailDto = {
  subject: string;
  message: string;
  from_name: string;
  from_email: string;
};
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TContactEmailDto;
    if (!body.subject || !body.message || !body.from_email || !body.from_name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      subject: body.subject,
      replyTo: body.from_email,
      // to: process.env.SUPPORT_EMAIL as string,
      to: "mohammednassar740@gmail.com", // use my email because the domain validation error ==> i don't have a domain
      from: `${body.from_name} <onboarding@resend.dev>`,
      react: ContactEmailTemplate({
        content: body.message,
        senderEmail: body.from_email,
      }),
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
