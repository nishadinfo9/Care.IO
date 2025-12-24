import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { service_id } = await params;
  try {
    const services = await dbConnect(collections.SERVICES);
    const service = await services.findOne({ _id: new ObjectId(service_id) });
    if (!service)
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );

    return NextResponse.json({ service });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching service", error: error.message },
      { status: 500 }
    );
  }
}
