"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PlaceCard from "@/components/places/PlaceCard";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ImagesCard from "@/components/places/ImagesCard";
import {allPlaces, images} from "@/data/allplaces";

const categories = [
  "All",
  "Historical Landmark",
  "Food Street",
  "Religious Site",
  "Nature Spot",
  "Food Hub",
  "Shopping & Entertainment",
  "Cultural Experience",
  "Adventure Park",
  "Entertainment",
];

export default function Places() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const filteredPlaces =
    selectedCategory === "All"
      ? allPlaces
      : allPlaces.filter((place) => place.tag === selectedCategory);

  const totalPages = Math.ceil(filteredPlaces.length / cardsPerPage);
  const paginatedPlaces = filteredPlaces.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#0b1d1a] text-white">
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 z-10  flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="hover:text-lime-300 text-white transition duration-200 cursor-pointer fixed top-4 left-4 z-20"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <Image
          src="/images/placeimage.jpg"
          alt="Hero"
          layout="fill"
          objectFit="cover"
          className="brightness-[0.6]"
        />
        <motion.div
          className="absolute bottom-10 left-10 right-10 md:bottom-10 md:left-10 backdrop-blur-md max-w-md p-6 rounded-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <h1 className="text-4xl font-bold text-lime-300 mb-4">
            What is Your Favourite Destination?
          </h1>
          <p>
            Explore the cultural capital of Madhya Pradesh with vibrant food
            streets, monuments, and lifestyle.
          </p>
          <button className="mt-6 px-6 py-2 bg-lime-300 text-black rounded-full font-semibold">
            Scroll to see Destinations
          </button>
        </motion.div>
      </section>

      <section className=" px-6 md:px-16 py-10">
        <motion.div
          className="no-scrollbar flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full border
                ${
                  selectedCategory === category
                    ? "bg-lime-300 text-black font-semibold"
                    : "bg-transparent text-white border-gray-600 hover:bg-white/10"
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </section>

      <section className="px-6 md:px-16 py-4">
        <h2 className="text-3xl font-bold mb-6">Top Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPlaces.map((place, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <PlaceCard {...place} />
            </motion.div>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center text-white mt-10">
            <p className="text-lg text-lime-300 font-semibold ">
              No places found in this category.
            </p>
          </div>
        )}
        <div className="flex justify-center items-center gap-2 mt-10">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center border
                ${
                  currentPage === i + 1
                    ? "bg-lime-300 text-black font-bold"
                    : "text-white hover:bg-white/10"
                }
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
      <section className="px-6 md:px-16 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row items-center gap-8 rounded-lg overflow-hidden bg-black/60"
        >
          <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative">
            <Image
              src="/images/backg.png"
              alt="Indore History"
              fill
              className="object-cover brightness-[0.7]"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 text-white">
            <h2 className="text-3xl font-bold mb-4">History of Indore</h2>
            <p className="text-lg text-gray-300">
              Indore, the largest city in Madhya Pradesh, has a rich history
              that dates back to the 7th century. It was originally a small
              village called <strong>&quot;Indrapur&quot;</strong> and later
              became a prominent trading center during the Maratha Empire.
              <br />
              <br />
              The city is known for its historical landmarks, including the{" "}
              <strong>Rajwada Palace</strong> and
              <strong> Lal Bagh Palace</strong>, which reflect its royal
              heritage. It also hosts various cultural festivals like the{" "}
              <strong>Indore Festival</strong>, celebrating tradition and
              history.
            </p>
          </div>
        </motion.div>
      </section>
      <section className="px-6 md:px-16 py-10">
        <h2 className="text-3xl text-center font-bold mb-6">
          Best Places Images
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <ImagesCard {...img} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
