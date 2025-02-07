import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { authSchema } from "@/lib/validations";

import { verifyJWT } from "@/utils/jwt";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/auth/profile/:userId
 * @desc Get User Profile by user id
 * @access private (only user own the profile and admins)
 */
export async function GET(
  request: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        image: true,
        email: true,
        isAdmin: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user)
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    if (userFromToken?.id !== user?.id)
      return NextResponse.json(
        { message: "only user itself can access his profile" },
        { status: 403 }
      );

    return NextResponse.json(user, { status: 200 });
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
 * @route ~/api/auth/profile/:userId
 * @desc Update User Profile by user id
 * @access private
 */
type TUpdateUser = {
  image?: string;
  username?: string;
  password?: string;
};
export async function PUT(
  request: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    if (userFromToken?.id !== user?.id)
      return NextResponse.json(
        { message: "only user itself can access his profile" },
        { status: 403 }
      );

    const body = (await request.json()) as TUpdateUser;

    const updateUserSchema = authSchema
      .omit({
        id: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
      })
      .partial();

    const validation = updateUserSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...updatedUser } = await prisma.user.update({
      where: { id: userId },
      data: { ...body },
    });

    return NextResponse.json(
      {
        message: "User Updated Successfully",
        user: updatedUser,
      },
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
 * @route ~/api/auth/profile/:userId
 * @desc delete User Profile by user id
 * @access private
 */
export async function DELETE(
  request: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          include: { comments: true },
        },
        comments: true,
      },
    });
    if (!user)
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });

    const userFromToken = verifyJWT(request);
    console.log(userFromToken?.id);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    if (userFromToken?.id !== user?.id)
      return NextResponse.json(
        { message: "only user itself can delete his profile" },
        { status: 403 }
      );

    // 1) delete the user comments
    await prisma.comment.deleteMany({ where: { userId } });

    // 2) delete the user posts comments from other users
    const userPosts = await prisma.post.findMany({ where: { userId } });
    const userPostsIds: number[] = userPosts?.map((post) => post?.id);
    await prisma.comment.deleteMany({
      where: { postId: { in: userPostsIds } },
    });

    // 3) delete the user posts
    await prisma.post.deleteMany({ where: { id: { in: userPostsIds } } });

    // 4) delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "User Deleted Successfully" },
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
