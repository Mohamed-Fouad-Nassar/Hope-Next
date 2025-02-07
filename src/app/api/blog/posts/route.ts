import { PostStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";
import { postSchema } from "@/lib/validations";
import { ARTICLES_PER_PAGE } from "@/lib/constants";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/blog/posts (--OR--) ~/api/blog/posts?page={value} (--OR--) ~/api/blog/posts?status={value}
 * @desc Get All Blog Posts (--OR--) Get Posts With Pagination (--OR--) Get Posts By Status
 * @access public
 */
export async function GET(request: NextRequest) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const page = request.nextUrl.searchParams.get("page") || "1";
    const status = (request.nextUrl.searchParams.get("status") ||
      "PUBLISHED") as PostStatus | "all";

    const userFromToken = verifyJWT(request);
    const userId = userFromToken?.id;

    // const postsOptions: { take?: number; skip?: number } = {
    //   skip: ARTICLES_PER_PAGE * (parseInt(page) - 1),
    //   take: ARTICLES_PER_PAGE,
    // };

    if (status === "DRAFT" || status === "HIDDEN") {
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

    const posts = await prisma.post.findMany({
      // ...postsOptions,
      skip: ARTICLES_PER_PAGE * (parseInt(page) - 1),
      take: ARTICLES_PER_PAGE,

      where: {
        status: status ? (status === "all" ? undefined : status) : undefined,
        userId: status === "DRAFT" ? userId : undefined,
      },
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
                userId: userId,
              },
            }
          : undefined,
        saves: userId
          ? {
              where: {
                userId: userId,
              },
            }
          : undefined,
      },
    });

    // Transform the data to add `isLiked` and `isSaved`
    const enhancedPosts = posts.map((post) => ({
      ...post,
      isLiked: post.likes?.length > 0,
      isSaved: post.saves?.length > 0,
    }));

    return NextResponse.json(enhancedPosts, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function GET(request: NextRequest) {
//   // await new Promise((resolve) => setTimeout(resolve, 5000));

//   try {
//     const page = request.nextUrl.searchParams.get("page") || "1";
//     // const ARTICLES_PER_PAGE =  userFromToken?.isAdmin? 12 : 6;
//     const ARTICLES_PER_PAGE = 6;

//     const userFromToken = verifyJWT(request);
//     const postsOptions: { take?: number; skip?: number } | undefined =
//       userFromToken?.isAdmin
//         ? {}
//         : {
//             skip: ARTICLES_PER_PAGE * (parseInt(page) - 1),
//             take: ARTICLES_PER_PAGE,
//           };
//     const posts = await prisma.post.findMany({
//       ...postsOptions,
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         user: {
//           select: {
//             id: true,
//             image: true,
//             email: true,
//             isAdmin: true,
//             username: true,
//           },
//         },
//         _count: {
//           select: {
//             likes: true,
//             saves: true,
//             comments: true,
//           },
//         },
//       },
//     });

//     // const posts = await prisma.post.findMany({
//     //   skip: ARTICLES_PER_PAGE * (parseInt(page) - 1),
//     //   take: ARTICLES_PER_PAGE,
//     // });

//     return NextResponse.json(posts, { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
// export async function GET() {
//   try {
//     const posts = await prisma.post.findMany();
//     return NextResponse.json(posts, { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

/**
 * @method POST
 * @route ~/api/blog/posts
 * @desc Add New Blog Post
 * @access private (only admin can create posts)
 */
type TCreatePostDto = {
  image: string;
  title: string;
  status: PostStatus;
  description: string;
};
export async function POST(request: NextRequest) {
  try {
    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    if (!userFromToken?.isAdmin)
      return NextResponse.json(
        { message: "only admins can create/draft posts" },
        { status: 403 }
      );

    const body = (await request.json()) as TCreatePostDto;
    const createPostSchema = postSchema.omit({
      id: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    });

    const validation = createPostSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const newPost = await prisma.post.create({
      data: {
        image: body.image,
        title: body.title,
        userId: userFromToken?.id,
        description: body.description,
        status: body.status,
      },
    });

    return NextResponse.json(
      { post: newPost, message: "Post Created Successfully" },
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
