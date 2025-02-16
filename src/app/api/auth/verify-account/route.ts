import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import WelcomeEmailTemplate from "@/emails/welcome";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * @method POST
 * @route ~/api/auth/verify-account
 * @desc Verify New User Account
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { code: string };

    if (!body.code)
      return NextResponse.json(
        { message: "No code provided" },
        { status: 500 }
      );

    const user = await prisma.user.findUnique({
      where: {
        emailVerificationCode: body.code,
      },
    });
    if (!user)
      return NextResponse.json(
        { message: "Invalid Verification Code!" },
        { status: 404 }
      );

    await prisma.user.update({
      where: {
        emailVerificationCode: body.code,
      },
      data: {
        emailVerified: true,
        emailVerificationCode: null,
      },
    });

    const { error } = await resend.emails.send({
      to: user.email,
      subject: "Welcome to Hope",
      replyTo: process.env.SUPPORT_EMAIL,
      from: "Hope Foundation <onboarding@resend.dev>",
      react: WelcomeEmailTemplate({ username: user?.username }),
    });
    if (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Failed to send welcome email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email Verified Successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
