import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { EventStatus, EventTypeStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/blog/events/count
 * @desc Get Events Count
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get("type") as
      | EventTypeStatus
      | "all";
    const status = request.nextUrl.searchParams.get("status") as
      | EventStatus
      | "all";

    const count = await prisma.event.count({
      where: {
        locationType: type ? (type === "all" ? undefined : type) : undefined,
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
