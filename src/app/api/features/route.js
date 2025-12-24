// app/api/features/route.js
import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const services = await dbConnect(collections.SERVICES);
    const result = await services.find({}).toArray();
    return NextResponse.json({
      message: "Services fetched successfully",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching services", error: error.message },
      { status: 500 }
    );
  }
}
