import bcrypt from "bcryptjs";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { passwordSchema } from "@/lib/validations";
import ChangePasswordEmailTemplate from "@/emails/change-password";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * @method PUT
 * @route ~/api/auth/change-password
 * @desc Change User Password By User Id
 * @access private
 */
type TUpdatePasswordDto = {
  token: string;
  password: string;
  repeatPassword: string;
};
export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as TUpdatePasswordDto;

    const user = await prisma.user.findUnique({
      where: { resetPasswordToken: body.token },
    });

    if (!user)
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });

    const today = new Date();
    if (!user.resetPasswordTokenExpiry || today > user.resetPasswordTokenExpiry)
      return NextResponse.json(
        { message: "Expired Reset Password Token" },
        { status: 400 }
      );

    const validation = passwordSchema.safeParse({
      password: body.password,
      repeatPassword: body.repeatPassword,
    });
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(body.password, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: newPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    });

    const { error } = await resend.emails.send({
      to: user.email,
      replyTo: process.env.SUPPORT_EMAIL,
      from: "Hope Foundation <onboarding@resend.dev>",
      subject: "Your Password has been Changed Successfully",
      react: ChangePasswordEmailTemplate({ username: user?.username }),
    });
    if (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Failed to send password change email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Your Password Updated Successfully" },
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
