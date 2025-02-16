import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { authSchema } from "@/lib/validations";
import { generateJWT, setCookie } from "@/utils/jwt";

export const dynamic = "force-dynamic";

/**
 * @method POST
 * @route ~/api/auth/login
 * @desc Login User
 * @access public
 */
type TLoginUser = {
  email: string;
  password: string;
};
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TLoginUser;

    const loginSchema = authSchema.omit({
      id: true,
      image: true,
      isAdmin: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    });

    const validation = loginSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user)
      return NextResponse.json(
        { message: "Invalid User Email or Password" },
        { status: 400 }
      );

    if (!user.emailVerified)
      return NextResponse.json(
        { message: "Account not verified. Please verify your account" },
        { status: 400 }
      );

    const isPasswordMatch = await bcrypt.compare(body.password, user.password);

    if (!isPasswordMatch)
      return NextResponse.json(
        { message: "Invalid User Email or Password" },
        { status: 400 }
      );

    const jwtPayload = {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      username: user.username,
    };

    const token = generateJWT(jwtPayload);
    const cookie = setCookie(jwtPayload);

    return NextResponse.json(
      {
        message: "User Logged In Successfully",
        token,
        user: {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
          username: user.username,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
