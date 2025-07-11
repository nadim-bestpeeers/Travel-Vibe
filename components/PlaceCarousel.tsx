"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlaceCard from "./PlaceCard";
import { Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { getRole } from "@/utils/auth";

interface PlaceResponse {
  _id: string;
  name: string;
  tag: string;
  image: string;
}
export default function PlaceCarousel() {
  const [places, setPlaces] = useState<PlaceResponse[]>([]);
  const role = getRole();
  const isAdmin = role === "admin" || role === "superadmin";
  console.log("Role:", role);

  useEffect(() => {
    const fetchPlaces = async () => {
      const res = await axios.get<PlaceResponse[]>(
        "http://localhost:5000/api/places"
      );
      setPlaces(res.data);
    };
    fetchPlaces();
  }, []);
  return (
    <section className="bg-black px-6 md:px-16 py-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Top Places
        </h1>
        {isAdmin && (
          <Link
            href="/add-top-place"
            className="px-4 py-2 bg-lime-500 text-black font-semibold rounded hover:bg-lime-400 transition"
          >
            + Add Place
          </Link>
        )}
      </div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={16}
        slidesPerView={1.3}
        grabCursor={true}
        breakpoints={{ 768: { slidesPerView: 3.5 } }}
      >
        {places.map((place, index) => (
          <SwiperSlide key={index}>
            <PlaceCard key={index} {...place} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
