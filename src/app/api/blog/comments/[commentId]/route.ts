import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";
import { updateCommentSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/blog/comments/:commentId
 * @desc Get Single Post Comment By postId And CommentId
 * @access public
 */
export async function GET(
  request: NextRequest,
  { params: { commentId } }: { params: { commentId: string } }
) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId) },
    });

    if (!comment)
      return NextResponse.json(
        { message: "Comment Not Found" },
        { status: 404 }
      );

    return NextResponse.json(comment, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/blog/comments/:commentId
 * @desc Update Post Comment By CommentId
 * @access private (only owner can edit comment)
 */
type TUpdateCommentDto = {
  content: string;
};
export async function PUT(
  request: NextRequest,
  { params: { commentId } }: { params: { commentId: string } }
) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId) },
    });

    if (!comment)
      return NextResponse.json(
        { message: "Comment Not Found" },
        { status: 404 }
      );

    const post = await prisma.post.findUnique({
      where: { id: comment?.postId },
    });

    if (!post)
      return NextResponse.json({ message: "Post Not Found" }, { status: 404 });

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    if (userFromToken?.id !== comment.userId)
      return NextResponse.json(
        { message: "only user itself can edit his comment" },
        { status: 403 }
      );

    const body = (await request.json()) as TUpdateCommentDto;

    const validation = updateCommentSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(commentId) },
      data: { content: body.content },
    });

    return NextResponse.json(
      { message: "Comment Updated Successfully", comment: updatedComment },
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

/**
 * @method DELETE
 * @route ~/api/blog/comments/:commentId
 * @desc delete Post Comment By CommentId
 * @access private (only admins and owner can delete comment)
 */
export async function DELETE(
  request: NextRequest,
  { params: { commentId } }: { params: { commentId: string } }
) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId) },
    });

    if (!comment)
      return NextResponse.json(
        { message: "Comment Not Found" },
        { status: 404 }
      );

    const post = await prisma.post.findUnique({
      where: { id: comment?.postId },
    });

    if (!post)
      return NextResponse.json({ message: "Post Not Found" }, { status: 404 });

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );

    if (userFromToken?.isAdmin || userFromToken?.id === comment?.userId) {
      await prisma.comment.delete({
        where: { id: parseInt(commentId) },
      });

      return NextResponse.json(
        { message: "Comment Deleted Successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "only admins or owner of comment can delete it" },
      { status: 403 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
