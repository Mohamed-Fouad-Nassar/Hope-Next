import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";
import { organizerSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/organizers
 * @desc Get All Events Organizers
 * @access public
 */
export async function GET() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const organizers = await prisma.eventOrganizer.findMany({
      select: {
        id: true,
        name: true,
        contact: true,
        website: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            events: true,
          },
        },
      },
    });

    return NextResponse.json(organizers, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @route ~/api/organizers
 * @desc Create New Event Organizer
 * @access private (only admins can create new organizer)
 */
type TCreateOrganizerDto = {
  name: string;
  contact: string;
  website?: string;
};
export async function POST(request: NextRequest) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    if (!userFromToken?.isAdmin)
      return NextResponse.json(
        { message: "only admins can create organizer" },
        { status: 403 }
      );

    const body = (await request.json()) as TCreateOrganizerDto;
    const createOrganizerSchema = organizerSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    });

    const validation = createOrganizerSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const newOrganizer = await prisma.eventOrganizer.create({
      data: {
        name: body.name,
        contact: body.contact,
        website: body.website,
      },
    });

    return NextResponse.json(
      { organizer: newOrganizer, message: "Organizer Created Successfully" },
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
