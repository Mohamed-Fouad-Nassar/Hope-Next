import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import WelcomeEmailTemplate from "@/emails/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email: string };
    if (!body.email)
      return NextResponse.json(
        { message: "No email provided" },
        { status: 500 }
      );

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user)
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });

    const { data, error } = await resend.emails.send({
      to: body.email,
      subject: "Welcome to Hope",
      replyTo: process.env.SUPPORT_EMAIL,
      from: "Hope Foundation <onboarding@resend.dev>",
      react: WelcomeEmailTemplate({ username: user?.username }),
    });
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
