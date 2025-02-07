import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { verifyJWT } from "@/utils/jwt";
import { USERS_PER_PAGE } from "@/lib/constants";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/auth/users (--OR--) ~/api/auth/users?page={value}
 * @desc Get All Users (--OR--) Get All Users With Pagination
 * @access private (only admins can get all users)
 */
export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("page") || "1";
    const usersOptions: { take?: number; skip?: number } = {
      skip: USERS_PER_PAGE * (parseInt(page) - 1),
      take: USERS_PER_PAGE,
    };

    const users = await prisma.user.findMany({
      ...usersOptions,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        image: true,
        email: true,
        isAdmin: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            saves: true,
            likes: true,
            comments: true,
          },
        },
      },
    });
    if (!users)
      return NextResponse.json({ message: "Users Not Found" }, { status: 404 });

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    if (!userFromToken?.isAdmin)
      return NextResponse.json(
        { message: "only admins can access all users" },
        { status: 403 }
      );

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
