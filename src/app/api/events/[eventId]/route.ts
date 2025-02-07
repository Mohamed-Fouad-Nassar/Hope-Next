import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";
import { eventSchema } from "@/lib/validations";
import { EventStatus, EventTypeStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/events/:eventId
 * @desc Get Single Event By eventId
 * @access public
 */
export async function GET(
  request: NextRequest,
  { params: { eventId } }: { params: { eventId: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(eventId),
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            contact: true,
            website: true,
          },
        },
        user: {
          select: {
            id: true,
            image: true,
            email: true,
            isAdmin: true,
            username: true,
          },
        },
      },
    });

    if (!event)
      return NextResponse.json({ message: "Event Not Found" }, { status: 404 });

    return NextResponse.json(event, { status: 200 });
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
 * @route ~/api/events/:eventId
 * @desc Update Event By eventId
 * @access private (only admin that is own the event can edit event)
 */
type TUpdateEventDto = {
  title: string;
  description: string;
  locationType: EventTypeStatus;
  status?: EventStatus;
  startDate: Date;
  endDate: Date;
  venue?: string;
  address?: string;
  mapLink?: string;
  onlineLink?: string;
  bannerImage: string;
  gallery?: string[];
  resources?: string[];
  organizerId: string;
};
export async function PUT(
  request: NextRequest,
  { params: { eventId } }: { params: { eventId: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
    });

    if (!event)
      return NextResponse.json({ message: "Event Not Found" }, { status: 404 });

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );
    if (!userFromToken.isAdmin)
      return NextResponse.json(
        { message: "only admins can edit event" },
        { status: 403 }
      );
    if (userFromToken?.id !== event?.userId)
      return NextResponse.json(
        { message: "only owner of event can edit it" },
        { status: 403 }
      );

    const body = (await request.json()) as TUpdateEventDto;
    const updateEventSchema = eventSchema
      .omit({
        id: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        organizerId: true,
      })
      .partial();

    const validation = updateEventSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(eventId) },
      data: {
        ...body,
        startDate: body?.startDate
          ? new Date(body.startDate)
          : event?.startDate,
        endDate: body?.endDate ? new Date(body.endDate) : event?.endDate,
      },
    });

    return NextResponse.json(
      { message: "Event Updated Successfully", event: updatedEvent },
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

/**
 * @method DELETE
 * @route ~/api/events/:eventId
 * @desc Delete Event By eventId
 * @access private (only admins or admin that is own the event can delete event)
 */
export async function DELETE(
  request: NextRequest,
  { params: { eventId } }: { params: { eventId: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) },
    });

    if (!event)
      return NextResponse.json({ message: "Event Not Found" }, { status: 404 });

    const userFromToken = verifyJWT(request);
    if (!userFromToken)
      return NextResponse.json(
        { message: "no token provided, access denied" },
        { status: 401 }
      );

    if (userFromToken?.isAdmin && userFromToken?.id === event?.userId) {
      await prisma.event.delete({
        where: { id: parseInt(eventId) },
      });

      return NextResponse.json(
        { message: "Event Deleted Successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "only admins or admin that is own this event can delete it" },
      { status: 403 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
