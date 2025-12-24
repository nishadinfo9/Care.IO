import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      serviceId,
      userEmail,
      duration,
      division,
      district,
      area,
      address,
      totalCost,
    } = data;

    if (
      !serviceId ||
      !userEmail ||
      !duration ||
      !division ||
      !district ||
      !area ||
      !address
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const IsService = await dbConnect(collections.SERVICES);

    const service = await IsService.findOne({
      _id: new ObjectId(serviceId),
    });
    if (!service) return NextResponse({ message: "services not found" });

    const bookings = await dbConnect(collections.BOOKINGS);
    const newBooking = {
      serviceId: service._id,
      serviceName: service.name,
      userEmail: userEmail || "",
      duration,
      division,
      district,
      area,
      address,
      totalCost,
      status: "Pending",
      createdAt: new Date(),
    };

    const result = await bookings.insertOne(newBooking);

    return NextResponse.json({
      message: "Booking created successfully",
      booking: { ...newBooking, _id: result.insertedId },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating booking", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "session not found" });

    const isBooking = await dbConnect(collections.BOOKINGS);
    const booking = await isBooking
      .find({
        userEmail: session?.user?.email,
      })
      .toArray();

    return NextResponse.json({ bookings: booking });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching bookings", error: error.message },
      { status: 500 }
    );
  }
}
