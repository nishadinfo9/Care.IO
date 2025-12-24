"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBaby, FaUserAlt, FaHeartbeat } from "react-icons/fa";

const iconMap = {
  "baby-care": <FaBaby size={40} className="text-blue-500" />,
  "elderly-care": <FaUserAlt size={40} className="text-green-500" />,
  "sick-people-service": <FaHeartbeat size={40} className="text-red-500" />,
};

export default function ServicesOverview() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/features");
        const data = await res.json();
        setServices(data.result);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-20 px-4 bg-gray-50 text-center">
      <h2 className="text-4xl font-semibold mb-8">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="p-8 border bg-white border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <div className="mb-4 flex justify-center">
              {iconMap[service.slug] || <FaHeartbeat size={50} />}
            </div>
            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
            <Link
              href={`/service/${service.slug}`}
              className="mt-2 text-blue-600 hover:underline font-medium"
            >
              Get Care
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
