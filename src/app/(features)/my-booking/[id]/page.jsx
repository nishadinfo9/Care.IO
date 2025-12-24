"use server";
import React from "react";
import {
  MdAccessTime,
  MdLocationOn,
  MdAttachMoney,
  MdEvent,
  MdCheckCircle,
  MdCancel,
} from "react-icons/md";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const BookingDetails = async ({ params }) => {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return <p>Unauthorized</p>;

  const bookings = await dbConnect(collections.BOOKINGS);
  const booking = await bookings.findOne({ _id: new ObjectId(id) });

  if (!booking) return <p>Booking not found</p>;

  if (booking.userEmail !== session.user.email) return <p>Access Denied</p>;

  return (
    <div className="max-w-3xl my-22 mx-auto p-6 bg-white shadow-2xl rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {booking.serviceName}
      </h1>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-700">
          <MdAccessTime className="text-blue-500 text-xl" />
          <span>
            <strong>Duration:</strong> {booking.duration} Hours
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <MdLocationOn className="text-green-500 text-xl" />
          <span>
            <strong>Location:</strong> {booking.address}, {booking.area},{" "}
            {booking.district}, {booking.division}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <MdAttachMoney className="text-yellow-500 text-xl" />
          <span>
            <strong>Total Cost:</strong> ৳{booking.totalCost}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <MdEvent className="text-purple-500 text-xl" />
          <span>
            <strong>Created At:</strong>{" "}
            {new Date(booking.createdAt).toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          {booking.status === "Pending" ? (
            <MdCancel className="text-red-500 text-xl" />
          ) : (
            <MdCheckCircle className="text-green-500 text-xl" />
          )}
          <span>
            <strong>Status:</strong> {booking.status}
          </span>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="flex-1 py-3 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Cancel Booking
        </button>
        <button className="flex-1 py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;
