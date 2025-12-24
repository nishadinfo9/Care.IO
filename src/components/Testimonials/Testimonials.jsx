"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const testimonialsArr = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "Care.xyz makes caregiving so easy!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Lee",
    text: "Highly trusted and reliable service.",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    id: 3,
    name: "Ayesha Rahman",
    text: "Booking caretakers is simple and secure!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 px-4 text-center">
      <h2 className="text-4xl font-semibold mb-12">What Our Users Say</h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {testimonialsArr.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="p-6 bg-white rounded-lg shadow-xl flex flex-col items-center max-w-md mx-auto">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <p className="italic mb-2">"{testimonial.text}"</p>
              <h4 className="font-bold">{testimonial.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default Testimonials;
