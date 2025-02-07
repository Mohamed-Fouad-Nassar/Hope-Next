import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";

import { COMMENTS_PER_PAGE } from "@/lib/constants";
import { createCommentSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/blog/comments (--OR--) ~/api/blog/comments?page={value}
 * @desc Get all Blog Post Comments (--OR--) Get Posts With Pagination
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("page") || "1";

    const commentsOptions: { take?: number; skip?: number } = {
      skip: COMMENTS_PER_PAGE * (parseInt(page) - 1),
      take: COMMENTS_PER_PAGE,
    };

    const comments = await prisma.comment.findMany({
      ...commentsOptions,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            image: true,
            email: true,
            isAdmin: true,
            username: true,
          },
        },
      },
    });

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    if (userFromToken.isAdmin === false)
      return NextResponse.json(
        { message: "only admins can access all comments" },
        { status: 403 }
      );

    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/blog/comments
 * @desc Add New Blog Post Comment By postId
 * @access public
 */
type TCreateCommentDto = {
  postId: number;
  content: string;
};
export async function POST(request: NextRequest) {
  try {
    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );

    const body = (await request.json()) as TCreateCommentDto;

    const validation = createCommentSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const post = await prisma.post.findUnique({
      where: { id: body?.postId },
    });

    if (!post)
      return NextResponse.json({ message: "Post Not Found" }, { status: 404 });

    const newComment = await prisma.comment.create({
      data: {
        postId: body.postId,
        content: body.content,
        userId: userFromToken?.id,
      },
    });

    return NextResponse.json(
      { comment: newComment, message: "Comment Created Successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
