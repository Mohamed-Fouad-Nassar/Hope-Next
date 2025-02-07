import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";
import { likeSavePostSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/blog/posts/likes
 * @desc Get All Liked Blog Posts
 * @access public
 */
export async function GET(request: NextRequest) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );

    const posts = await prisma.like.findMany({
      where: { userId: userFromToken?.id, post: { status: "PUBLISHED" } },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        post: {
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
            _count: {
              select: {
                likes: true,
                saves: true,
                comments: true,
              },
            },
            likes: {
              where: {
                userId: userFromToken.id, // Check if this user liked the post
              },
            },
            saves: {
              where: {
                userId: userFromToken.id, // Check if this user saved the post
              },
            },
          },
        },
      },
    });

    const enhancedPosts = posts.map((item) => ({
      ...item,
      post: {
        ...item.post,
        isLiked: item.post.likes?.length > 0,
        isSaved: item.post.saves?.length > 0,
      },
    }));

    return NextResponse.json(enhancedPosts, { status: 200 });
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
 * @route ~/api/blog/posts/likes
 * @desc Like Blog Post (Like Post)
 * @access public
 */
type TPostLikeDto = {
  postId: number;
};
export async function POST(request: NextRequest) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "No token provided, Access denied" },
        { status: 401 }
      );

    const { postId } = (await request.json()) as TPostLikeDto;

    const post = await prisma.post.findUnique({
      where: { id: postId, status: "PUBLISHED" },
    });
    if (!post)
      return NextResponse.json({ message: "Post Not Found" }, { status: 400 });

    const isLiked = await prisma.like.findFirst({
      where: {
        userId: userFromToken.id,
        postId: postId,
      },
    });
    if (isLiked)
      return NextResponse.json(
        { message: "You already liked this post" },
        { status: 400 }
      );

    const validation = likeSavePostSchema.safeParse({ postId });
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const newLike = await prisma.like.create({
      data: {
        userId: userFromToken.id,
        postId: postId,
      },
    });
    return NextResponse.json(newLike, { status: 200 });
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
 * @route ~/api/blog/posts/likes
 * @desc Unlike Blog Post (Delete Post Like)
 * @access public
 */
export async function DELETE(request: NextRequest) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const postId = request.nextUrl.searchParams.get("postId");

    if (!postId)
      return NextResponse.json(
        {
          message: "PostId Missing. Failed to like post",
        },
        { status: 400 }
      );

    if (isNaN(parseInt(postId)))
      return NextResponse.json(
        {
          message: "PostId Must be a number. Failed to like post",
        },
        { status: 400 }
      );

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "No token provided, Access denied" },
        { status: 401 }
      );

    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId), status: "PUBLISHED" },
    });
    if (!post)
      return NextResponse.json({ message: "Post Not Found" }, { status: 400 });

    const like = await prisma.like.findFirst({
      where: {
        userId: userFromToken.id,
        postId: parseInt(postId),
      },
    });
    if (!like)
      return NextResponse.json(
        { message: "You haven't liked this post" },
        { status: 400 }
      );

    if (userFromToken?.id !== like?.userId)
      return NextResponse.json(
        { message: "only owner of like can delete it" },
        { status: 403 }
      );

    const validation = likeSavePostSchema.safeParse({
      postId: parseInt(postId),
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

    await prisma.like.delete({
      where: { id: like.id },
    });

    return NextResponse.json(
      { message: "Like removed successfully" },
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
