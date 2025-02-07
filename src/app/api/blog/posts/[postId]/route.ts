import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";
import { postSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/blog/posts/:postId
 * @desc Get Single Blog Post By postId with check the post status and user permission to get it
 * @access public
 */
export async function GET(
  request: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    const userFromToken = verifyJWT(request);
    const userId = userFromToken?.id;

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            image: true,
            isAdmin: true,
            username: true,
          },
        },
        comments: {
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: { id: true, username: true, email: true, image: true },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            saves: true,
            comments: true,
          },
        },
        likes: userId
          ? {
              where: {
                userId: userId, // Filter to check if this user liked the post
              },
            }
          : undefined,
        saves: userId
          ? {
              where: {
                userId: userId, // Filter to check if this user saved the post
              },
            }
          : undefined,
      },
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

    // Transform the data to add `isLiked` and `isSaved`
    const enhancedPost = {
      ...post,
      isLiked: post.likes?.length > 0,
      isSaved: post.saves?.length > 0,
    };

    return NextResponse.json(enhancedPost, { status: 200 });
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
 * @route ~/api/blog/posts/:postId
 * @desc Update Blog Post By postId
 * @access private (only admin that is own the post can edit post)
 */
type TUpdatePostDto = {
  title?: string;
  description?: string;
  image?: string;
};
export async function PUT(
  request: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!post)
      return NextResponse.json({ message: "Post Not Found" }, { status: 404 });

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    if (!userFromToken.isAdmin)
      return NextResponse.json(
        { message: "only admins can edit posts" },
        { status: 403 }
      );
    if (userFromToken?.id !== post?.userId)
      return NextResponse.json(
        { message: "only owner of post can edit it" },
        { status: 403 }
      );

    const body = (await request.json()) as TUpdatePostDto;
    const updatePostSchema = postSchema
      .omit({
        id: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      })
      .partial();

    const validation = updatePostSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(postId) },
      data: { ...body },
    });

    return NextResponse.json(
      { message: "Post Updated Successfully", post: updatedPost },
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
 * @route ~/api/blog/posts/:postId
 * @desc Delete Blog Post By postId
 * @access private (only admins or admin that is own the post can delete post)
 */
export async function DELETE(
  request: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });

    if (!post)
      return NextResponse.json({ message: "Post Not Found" }, { status: 404 });

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );

    if (userFromToken?.isAdmin && userFromToken?.id === post?.userId) {
      await prisma.comment.deleteMany({
        where: { postId: parseInt(postId) },
      });
      await prisma.like.deleteMany({
        where: { postId: parseInt(postId) },
      });
      await prisma.save.deleteMany({
        where: { postId: parseInt(postId) },
      });
      await prisma.post.delete({
        where: { id: parseInt(postId) },
      });

      return NextResponse.json(
        { message: "Post Deleted Successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "only admins or admin that is own this post can delete it" },
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
