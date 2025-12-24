"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { status } = useSession();
  const router = useRouter();

  const logoutHandler = async () => {
    await signOut({ redirect: false });
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/my-booking"}>My Booking</Link>
            </li>
          </ul>
        </div>
        <Link className="text-2xl font-bold" href={"/"}>
          Care.IO
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/my-booking"}>My Booking</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {status === "authenticated" ? (
          <>
            <button
              onClick={logoutHandler}
              className="btn btn-error text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-primary" href={"/login"}>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
