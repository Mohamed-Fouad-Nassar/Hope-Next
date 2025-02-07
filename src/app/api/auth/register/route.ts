import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { setCookie } from "@/utils/jwt";
import { registerSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

/**
 * @method POST
 * @route ~/api/auth/register
 * @desc Add New User
 * @access public
 */
type TRegisterUser = {
  email: string;
  isAdmin: boolean;
  username: string;
  password: string;
};
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TRegisterUser;

    const validation = registerSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (user)
      return NextResponse.json(
        { message: "User Already Registered" },
        { status: 400 }
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        isAdmin: body.isAdmin,
        username: body.username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        isAdmin: true,
        username: true,
      },
    });

    const jwtPayload = {
      id: newUser.id,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      username: newUser.username,
    };
    const cookie = setCookie(jwtPayload);

    return NextResponse.json(
      {
        message: "User Created Successfully",
        user: newUser,
      },
      { status: 201, headers: { "Set-Cookie": cookie } }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
