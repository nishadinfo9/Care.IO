import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const services = await dbConnect(collections.SERVICES);
    const service = await services.findOne({ slug });

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Service fetched successfully",
      service,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching services", error: error.message },
      { status: 500 }
    );
  }
}
