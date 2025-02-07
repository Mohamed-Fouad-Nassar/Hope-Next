import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/blog/posts/:postId/comments
 * @desc Get Single Blog Post Comments By postId with check the post status and user permission to get it
 * @access public
 */
export async function GET(
  request: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    const userFromToken = verifyJWT(request);

    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!post)
      return NextResponse.json({ message: "Post Not Found" }, { status: 404 });

    if (post?.status === "DRAFT" || post?.status === "HIDDEN") {
      if (!userFromToken)
        return NextResponse.json(
          { message: "no token provided, access denied" },
          { status: 401 }
        );
      if (!userFromToken.isAdmin)
        return NextResponse.json(
          { message: "only admins can get hidden/draft posts" },
          { status: 403 }
        );
    }

    if (post?.status === "DRAFT" && userFromToken?.id !== post.userId)
      return NextResponse.json(
        { message: "only admins can get their own draft posts" },
        { status: 403 }
      );

    const postComments = await prisma.comment.findMany({
      where: {
        postId: parseInt(postId),
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, username: true, email: true, image: true },
        },
      },
    });

    if (!postComments)
      return NextResponse.json(
        { message: "Post Comments Not Found" },
        { status: 404 }
      );

    return NextResponse.json(postComments, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
