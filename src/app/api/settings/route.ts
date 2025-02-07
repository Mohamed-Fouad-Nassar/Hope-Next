import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";
import { settingsSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/settings
 * @desc Get All Settings
 * @access public
 */
export async function GET() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const settings = await prisma.settings.findFirst();

    if (!settings)
      return NextResponse.json(
        { message: "Settings Not Found" },
        { status: 404 }
      );

    return NextResponse.json(settings, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/settings
 * @desc Update Settings
 * @access public
 */
type TUpdateSettingsDto = {
  usersPerPage: number;
  eventsPerPage: number;
  articlesPerPage: number;
  commentsPerPage: number;
  postLengthLimit: number;
  eventLengthLimit: number;
};
export async function PUT(request: NextRequest) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const settings = await prisma.settings.findMany();
    if (!settings)
      return NextResponse.json(
        { message: "Settings Not Found" },
        { status: 404 }
      );

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    if (!userFromToken?.isAdmin)
      return NextResponse.json(
        { message: "only admins can create events" },
        { status: 403 }
      );

    const body = (await request.json()) as TUpdateSettingsDto;
    const updateSettingsSchema = settingsSchema
      .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
      })
      .partial();

    const validation = updateSettingsSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const updatedSettings = await prisma.settings.update({
      where: { id: 1 },
      data: body,
    });

    return NextResponse.json(
      { message: "Settings Updated Successfully", settings: updatedSettings },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
