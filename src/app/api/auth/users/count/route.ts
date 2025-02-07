import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/auth/users/count
 * @desc Get Auth Users Count
 * @access public
 */
export async function GET() {
  try {
    const count = await prisma.user.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
