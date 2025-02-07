import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyJWT } from "@/utils/jwt";
import { eventSchema } from "@/lib/validations";
import { EVENTS_PER_PAGE } from "@/lib/constants";

import { EventStatus, EventTypeStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @route ~/api/events
 * @desc Get All Events
 * @access public
 */
export async function GET(request: NextRequest) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  try {
    const page = request.nextUrl.searchParams.get("page") || "1";
    const type = request.nextUrl.searchParams.get("type") as
      | EventTypeStatus
      | "all";
    const status = request.nextUrl.searchParams.get("status") as
      | EventStatus
      | "all";

    const events = await prisma.event.findMany({
      skip: EVENTS_PER_PAGE * (parseInt(page) - 1),
      take: EVENTS_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        locationType: type ? (type === "all" ? undefined : type) : undefined,
        status: status ? (status === "all" ? undefined : status) : undefined,
      },
      select: {
        id: true,
        venue: true,
        title: true,
        status: true,
        address: true,
        endDate: true,
        createdAt: true,
        startDate: true,
        bannerImage: true,
        description: true,
        locationType: true,
        user: {
          select: {
            id: true,
            email: true,
            image: true,
            isAdmin: true,
            username: true,
          },
        },
      },
    });

    if (!events)
      return NextResponse.json(
        { message: "Events Not Found" },
        { status: 404 }
      );

    // if (!events?.length) return NextResponse.json([], { status: 200 });

    return NextResponse.json(events, { status: 200 });
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
 * @route ~/api/events
 * @desc Add New Event
 * @access private (only admin add create event)
 */
type TCreateEventDto = {
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
  organizerName: string;
  organizerContact: string;
  organizerWebsite?: string;
};
export async function POST(request: NextRequest) {
  try {
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

    const body = (await request.json()) as TCreateEventDto;
    const createEventSchema = eventSchema.omit({
      id: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    });

    const validation = createEventSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        {
          message: `${
            validation.error.issues[0].message
          } at field: ${validation.error.issues[0].path.join(".")}`,
        },
        { status: 400 }
      );

    const newEvent = await prisma.event.create({
      data: {
        ...validation.data,
        userId: userFromToken?.id,
      },
    });

    return NextResponse.json(
      { event: newEvent, message: "Event Created Successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
