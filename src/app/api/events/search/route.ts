import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/events/search?query=value
 * @desc Get Events By Search Query
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

    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
