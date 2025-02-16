import crypto from "crypto";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import ResetPasswordEmailTemplate from "@/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * @method POST
 * @route ~/api/send/reset-password
 * @desc Create Reset Password Email
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

    const resetPassToken = crypto.randomBytes(32).toString("base64url");
    const today = new Date();
    const resetPassTokenExpiry = new Date(today.setDate(today.getDate() + 1));

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetPassToken,
        resetPasswordTokenExpiry: resetPassTokenExpiry,
      },
    });

    const { error } = await resend.emails.send({
      to: user.email,
      subject: "Reset Your Password",
      replyTo: process.env.SUPPORT_EMAIL,
      from: "Hope Foundation <onboarding@resend.dev>",
      react: ResetPasswordEmailTemplate({
        email: user.email,
        username: user.username,
        resetPasswordToken: resetPassToken,
      }),
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(
      { message: "Reset Password Email Sent Successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
