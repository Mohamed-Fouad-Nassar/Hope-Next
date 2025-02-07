import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/auth/logout
 * @desc Logout User
 * @access public
 */
export function GET() {
  try {
    cookies().delete("jwtToken");
    return NextResponse.json(
      { message: "User Logout Successfully" },
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
