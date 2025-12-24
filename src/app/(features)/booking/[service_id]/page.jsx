"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "@/components/utils/Input";
import Select from "@/components/utils/Select";
import Button from "@/components/utils/Button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const BookingPage = () => {
  const [service, setService] = useState(null);
  const [allDistrict, setAllDistrict] = useState([]);
  const [allDivision, setAllDivision] = useState([]);
  const { service_id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      duration: 1,
      division: "",
      district: "",
      area: "",
      address: "",
    },
  });

  const [division, district] = watch(["division", "district"]);

  useEffect(() => {
    fetch("/data/division.json")
      .then((res) => res.json())
      .then((data) => setAllDivision(data));

    fetch("/data/warehouses.json")
      .then((res) => res.json())
      .then((data) => setAllDistrict(data));
  }, []);

  useEffect(() => {
    fetch(`/api/booking/${service_id}`)
      .then((res) => res.json())
      .then((data) => setService(data.service));
  }, [service_id]);

  const findDistrict = (singleDivision) => {
    const filtered = allDistrict.filter((d) => d.region === singleDivision);
    return filtered.map((item) => item.district);
  };

  const findArea = (singleDistrict) => {
    const filtered = allDistrict.filter((d) => d.city === singleDistrict);
    return filtered[0]?.covered_area || [];
  };

  const onSubmit = async (data) => {
    if (!service) return;

    const totalCost = data.duration * service.baseCharge;

    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: service._id,
        duration: data.duration,
        division: data.division,
        district: data.district,
        area: data.area,
        address: data.address,
        totalCost,
        userEmail: session?.user?.email,
      }),
    });
    if (res.ok) {
      router.push("/my-booking");
      toast.success("Booking confirmed");
    }
  };

  if (!service) return <h1>Not Found</h1>;

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">{service.name}</h1>
        <p className="text-gray-600">Price: ৳{service.baseCharge} / day</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg max-w-xl mx-auto shadow-2xl space-y-4"
      >
        <Input
          label="Duration (days)"
          type="number"
          {...register("duration", { required: true, min: 1 })}
        />

        <Select
          label="Division"
          placeholder="Select Division"
          options={allDivision}
          {...register("division", { required: true })}
        />
        <Select
          label="District"
          placeholder="Select District"
          options={findDistrict(division)}
          {...register("district", { required: true })}
        />
        <Select
          label="Area"
          placeholder="Select Area"
          options={findArea(district)}
          {...register("area", { required: true })}
        />

        <Input label="Address" {...register("address", { required: true })} />

        <div className="text-right text-xl font-bold">
          Total Cost: ৳{watch("duration") * service.baseCharge}
        </div>

        <div className="text-center">
          <Button type="submit" className="w-full">
            Confirm Booking
          </Button>
        </div>
      </form>
    </section>
  );
};

export default BookingPage;
