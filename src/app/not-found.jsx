"use client";

import Link from "next/link";
import Button from "@/components/utils/Button";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-600">404</h1>

        <h2 className="mt-4 text-2xl text-red-500 font-semibold">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-6">
          <Link href="/">
            <Button className="w-auto px-6">Go Back Home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
