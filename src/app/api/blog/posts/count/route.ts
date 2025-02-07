import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { PostStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/blog/posts/count?status={value}
 * @desc Get Blog Posts Count By Status
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const status = (request.nextUrl.searchParams.get("status") ||
      "PUBLISHED") as PostStatus | "all";

    const count = await prisma.post.count({
      where: {
        status: status ? (status === "all" ? undefined : status) : undefined,
      },
    });
    return NextResponse.json({ count }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
