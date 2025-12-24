"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaBaby, FaUserAlt, FaHeartbeat } from "react-icons/fa";

const iconMap = {
  "baby-care": <FaBaby size={50} className="text-blue-500" />,
  "elderly-care": <FaUserAlt size={50} className="text-green-500" />,
  "sick-people-service": <FaHeartbeat size={50} className="text-red-500" />,
};

export default function ServiceDetail() {
  const params = useParams();
  const { slug } = params;
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/features/${slug}`);
        const data = await res.json();
        setService(data?.service);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    fetchService();
  }, [slug]);

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold">Service not found</h2>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          {iconMap[service.slug] || <FaHeartbeat size={50} />}
        </div>

        <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
        <p className="text-lg text-gray-700">{service.description}</p>
        <p className="mt-4 text-xl font-semibold text-blue-600">
          Charge: ৳{service.baseCharge} / day
        </p>
      </div>

      {service.features?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {service.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-center">
        <Link
          href={`/booking/${service._id}`}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Get Care
        </Link>
      </div>
    </section>
  );
}
