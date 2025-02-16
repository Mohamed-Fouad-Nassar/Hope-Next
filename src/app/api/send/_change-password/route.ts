import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import ChangePasswordEmailTemplate from "@/emails/change-password";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * @method POST
 * @route ~/api/send/change-password
 * @desc Create Change Password Email
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email: string };
    if (!body.email)
      return NextResponse.json(
        { message: "No email provided" },
        { status: 500 }
      );

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user)
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });

    const { data, error } = await resend.emails.send({
      to: user.email,
      subject: "Change Password",
      replyTo: process.env.SUPPORT_EMAIL,
      from: "Hope Foundation <onboarding@resend.dev>",
      react: ChangePasswordEmailTemplate({
        username: user.username,
      }),
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
