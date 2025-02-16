import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

/**
 * @method POST
 * @route ~/api/auth/reset-password
 * @desc Verify Reset Password Token
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { token: string };

    if (!body.token)
      return NextResponse.json(
        { message: "No Token provided" },
        { status: 500 }
      );

    const user = await prisma.user.findUnique({
      where: {
        resetPasswordToken: body.token,
      },
      select: {
        id: true,
      },
    });
    if (!user)
      return NextResponse.json({ message: "Invalid Token!" }, { status: 404 });

    return NextResponse.json(
      { message: "Valid Token Provided", userId: user.id },
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
