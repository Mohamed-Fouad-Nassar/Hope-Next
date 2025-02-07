import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/blog/posts/search?query=value
 * @desc Get Blog Posts By Search Query
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("query");
    if (!query)
      return NextResponse.json(
        { message: "No search query provided" },
        { status: 400 }
      );

    const userFromToken = verifyJWT(request);
    const userId = userFromToken?.id;

    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            isAdmin: true,
            image: true,
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
      orderBy: {
        createdAt: "desc",
      },
      where: {
        status: "PUBLISHED",
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    // Add `isLiked` and `isSaved` fields to the response
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
//   try {
//     const query = request.nextUrl.searchParams.get("query");

//     const userFromToken = verifyJWT(request);
//     const userId = userFromToken?.id;

//     let posts;

//     if (query) {
//       posts = await prisma.post.findMany({
//         include: {
//           user: {
//             select: {
//               id: true,
//               username: true,
//               email: true,
//               isAdmin: true,
//               image: true,
//             },
//           },
//           _count: {
//             select: {
//               likes: true,
//               saves: true,
//               comments: true,
//             },
//           },
//           likes: userId
//             ? {
//                 where: {
//                   userId: userId,
//                 },
//               }
//             : undefined,
//           saves: userId
//             ? {
//                 where: {
//                   userId: userId,
//                 },
//               }
//             : undefined,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//         where: {
//           status: "PUBLISHED",
//           title: {
//             contains: query,
//             mode: "insensitive",
//           },
//         },
//       });
//     } else {
//       posts = await prisma.post.findMany({
//         skip: 0,
//         take: 6,
//         include: {
//           user: {
//             select: {
//               id: true,
//               username: true,
//               email: true,
//               isAdmin: true,
//               image: true,
//             },
//           },
//           _count: {
//             select: {
//               likes: true,
//               saves: true,
//               comments: true,
//             },
//           },
//           likes: userId
//             ? {
//                 where: {
//                   userId: userId,
//                 },
//               }
//             : undefined,
//           saves: userId
//             ? {
//                 where: {
//                   userId: userId,
//                 },
//               }
//             : undefined,
//         },
//       });
//     }

//     // Add `isLiked` and `isSaved` fields to the response
//     const enhancedPosts = posts.map((post) => ({
//       ...post,
//       isLiked: post.likes?.length > 0,
//       isSaved: post.saves?.length > 0,
//     }));

//     return NextResponse.json(enhancedPosts, { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
