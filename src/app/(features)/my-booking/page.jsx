"use client";

import Button from "@/components/utils/Button";
import Link from "next/link";
import { useEffect, useState } from "react";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/booking", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setBookings(data?.bookings));
  }, []);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">My Bookings</h1>

      {!bookings?.length ? (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              {/* Booking Info */}
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{booking.serviceName}</h2>
                <p className="text-gray-600">
                  Duration: {booking.duration} Hours
                </p>
                <p className="text-gray-600">
                  Location:{" "}
                  {booking.area +
                    ", " +
                    booking.district +
                    ", " +
                    booking.division}
                </p>
                <p className="font-semibold">
                  Total Cost: ৳{booking.totalCost}
                </p>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col items-start md:items-end gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusColor[booking.status]
                  }`}
                >
                  {booking.status}
                </span>

                <div className="flex gap-3">
                  <Link href={`/my-booking/${booking._id}`}>
                    <button className="btn btn-outline">View Details</button>
                  </Link>
                  {booking.status === "Pending" && (
                    <Button bg="bg-red-500 hover:bg-red-700 focus:ring-red-400">
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyBooking;
