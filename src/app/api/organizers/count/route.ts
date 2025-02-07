import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/organizers/count
 * @desc Get All Organizers Count
 * @access public
 */
export async function GET() {
  try {
    const count = await prisma.eventOrganizer.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
