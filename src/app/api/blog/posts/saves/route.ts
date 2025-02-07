import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";
import { likeSavePostSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/blog/posts/saves
 * @desc Get All Saved Blog Posts
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

    const posts = await prisma.save.findMany({
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
 * @route ~/api/blog/posts/saves
 * @desc Save Blog Post (Save Post)
 * @access public
 */
type TPostSaveDto = {
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

    const { postId } = (await request.json()) as TPostSaveDto;

    const post = await prisma.post.findUnique({
      where: { id: postId, status: "PUBLISHED" },
    });
    if (!post)
      return NextResponse.json({ message: "Post Not Found" }, { status: 400 });

    const isSaved = await prisma.save.findFirst({
      where: {
        userId: userFromToken.id,
        postId: postId,
      },
    });
    if (isSaved)
      return NextResponse.json(
        { message: "You already saved this post" },
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

    const newSave = await prisma.save.create({
      data: {
        userId: userFromToken.id,
        postId: postId,
      },
    });
    return NextResponse.json(newSave, { status: 200 });
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
 * @route ~/api/blog/posts/saves
 * @desc UnSave Blog Post (Delete Post Save)
 * @access public
 */
export async function DELETE(request: NextRequest) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const postId = request.nextUrl.searchParams.get("postId");

    if (!postId)
      return NextResponse.json(
        {
          message: "PostId Missing. Failed to unsave post",
        },
        { status: 400 }
      );

    if (isNaN(parseInt(postId)))
      return NextResponse.json(
        {
          message: "PostId Must be a number. Failed to unsave post",
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

    const save = await prisma.save.findFirst({
      where: {
        userId: userFromToken.id,
        postId: parseInt(postId),
      },
    });
    if (!save)
      return NextResponse.json(
        { message: "You haven't saved this post" },
        { status: 400 }
      );

    if (userFromToken?.id !== save?.userId)
      return NextResponse.json(
        { message: "only owner of save can delete it" },
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

    await prisma.save.delete({
      where: { id: save.id },
    });

    return NextResponse.json(
      { message: "Save removed successfully" },
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
