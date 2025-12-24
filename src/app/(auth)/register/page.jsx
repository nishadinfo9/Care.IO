"use client";

import { FiUserPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import Input from "@/components/utils/Input";
import Button from "@/components/utils/Button";
import Link from "next/link";
import { registerUser } from "@/actions/server/auth";
import { useRouter } from "next/navigation";
import SocialLogin from "@/components/Buttons/SocialLogin";

const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await registerUser(data);
    reset();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl my-10 p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            <FiUserPlus className="text-indigo-600" />
            Create an Account
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            label="Name *"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />

          <Input
            type="email"
            label="Email *"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />

          <Input
            type="number"
            label="Contact"
            placeholder="Contact number"
            {...register("contact")}
            error={errors.contact?.message}
          />

          <Input
            type="number"
            label="NID No"
            placeholder="NID number"
            {...register("nidNo")}
            error={errors.nidNo?.message}
          />

          <Input
            type="password"
            label="Password *"
            placeholder="Create a password"
            {...register("password", { required: "Password is required" })}
            error={errors.password?.message}
          />

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <SocialLogin />

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
