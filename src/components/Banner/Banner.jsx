"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import Link from "next/link";

const slides = [
  "Caring for your loved ones, made simple.",
  "Trusted care for children, elderly, and special needs.",
  "Book your caretaker anytime, anywhere.",
];

const Banner = () => {
  return (
    <section className="rounded py-28 bg-gradient-to-r from-blue-400 to-indigo-500 text-center">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {slides.map((text, index) => (
          <SwiperSlide key={index}>
            <h2 className="text-xl text-white md:text-5xl mx-5 font-bold mb-6">
              {text}
            </h2>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default Banner;
