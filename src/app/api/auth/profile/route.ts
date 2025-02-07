import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { verifyJWT } from "@/utils/jwt";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/auth/profile
 * @desc Get Current User Profile With all Data
 * @access private (only user own the profile)
 */
export async function GET(request: NextRequest) {
  try {
    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );

    const user = await prisma.user.findUnique({
      where: { id: userFromToken?.id },
      select: {
        id: true,
        image: true,
        email: true,
        isAdmin: true,
        // comments: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            posts: true,
            likes: true,
            saves: true,
            comments: true,
          },
        },
        posts: {
          where: userFromToken?.isAdmin ? { status: "PUBLISHED" } : undefined,
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: {
                image: true,
                email: true,
                username: true,
              },
            },
            _count: {
              select: {
                saves: true,
                likes: true,
                comments: true,
              },
            },
          },
        },
        likes: {
          where: userFromToken?.isAdmin
            ? undefined
            : { post: { status: "PUBLISHED" } },
          include: {
            post: {
              select: {
                id: true,
                title: true,
                status: true,
                createdAt: true,
                description: true,
                user: {
                  select: {
                    image: true,
                    email: true,
                    username: true,
                  },
                },
                _count: {
                  select: {
                    saves: true,
                    likes: true,
                    comments: true,
                  },
                },
              },
            },
          },
        },
        saves: {
          where: userFromToken?.isAdmin
            ? undefined
            : { post: { status: "PUBLISHED" } },
          include: {
            post: {
              select: {
                id: true,
                title: true,
                status: true,
                createdAt: true,
                description: true,
                user: {
                  select: {
                    image: true,
                    email: true,
                    username: true,
                  },
                },
                _count: {
                  select: {
                    saves: true,
                    likes: true,
                    comments: true,
                  },
                },
              },
            },
          },
        },
        comments: {
          where: userFromToken?.isAdmin
            ? undefined
            : { post: { status: "PUBLISHED" } },
        },
      },
    });
    if (!user)
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
