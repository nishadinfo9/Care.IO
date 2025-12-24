"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/utils/Input";
import Button from "@/components/utils/Button";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { loggedInUser } from "@/actions/server/auth";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import SocialLogin from "@/components/Buttons/SocialLogin";
import toast from "react-hot-toast";


const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res?.ok) {
      reset();
      router.push("/");
      toast.success("login successfully");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            <FiLogIn className="text-indigo-600" />
            Login to your account
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="email"
            label="Email *"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
            })}
            error={errors.email?.message}
          />

          <Input
            type="password"
            label="Password *"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
            error={errors.password?.message}
          />

          {/* Forgot password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <SocialLogin />

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
