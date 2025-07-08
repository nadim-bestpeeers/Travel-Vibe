"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import FoodCard from "@/components/FoodCard";
import { famousFoods, galleryImages } from "../../data/food";
import { motion } from "framer-motion";
import CursorTrail from "@/components/CursurTrail";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth"; // Adjust the import path as necessary  

const categories = ["All", "Snacks", "Sweets", "Drinks", "Street Food"];
export default function FoodPage() {
   const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredFoods, setFilteredFoods] = useState(famousFoods);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredFoods(famousFoods);
    } else {
      setFilteredFoods(famousFoods.filter((food) => food.category === selectedCategory));
    }
  }, [selectedCategory]);


  return (
    <>
    <CursorTrail/>
    <div className="bg-[#0b1d1a] text-white min-h-screen ">
      {/* Hero Section */}
      <div className="absolute top-0 left-0 right-0 z-10  flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="hover:text-lime-300 text-white transition duration-200 cursor-pointer fixed top-4 left-4 z-20"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
      <div className="relative h-[60vh] w-full" >
        <Image
          src="/food/hero.jpeg"
          alt="Indore Food"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl font-bold text-lime-400">
            Taste the Soul of Indore
          </h1>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl">
            From street-side delights to iconic dishes, explore the rich and
            spicy journey of Indore’s famous foods.
          </p>
        </div>
      </div>

      {/* Categories */}

      <motion.div
        className="flex flex-wrap gap-4 overflow-x-auto my-10 ml-2 pb-2 scrollbar-hide"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        viewport={{ once: false , amount: 0.2}}
        transition={{ duration: 0.6 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
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

      {/* Food Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4"
        data-aos="fade-up"
      >
        {filteredFoods.map((food) => (
          <FoodCard key={food.name} {...food} />
        ))}
      </div>

      {/* Gallery */}
      <h2 className="text-3xl text-center mt-16 mb-4 font-bold text-lime-300">Food Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
        {galleryImages.map((src, i) => (
          
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: false }}
              className="relative w-full h-64"
            >
            <Image
              src={src}
              alt="Food Gallery"
              layout="fill"
              objectFit="cover"
              className="rounded-lg hover:scale-105 transition-transform duration-300"
            />
         </motion.div>
        ))}
      </div>

      {/* Quote Section */}
      <div className="bg-[#0f172a] text-gray-300 text-center py-12 px-4 mt-16">
        <blockquote className="italic text-xl max-w-3xl mx-auto">
          &quot;Indore’s food isn’t just a meal. It’s a memory. It’s a midnight walk
          in Sarafa, it’s Poha for breakfast, it’s joy in every bite.&quot;
        </blockquote>
        <p className="mt-4 text-lime-400 font-semibold">— Local Foodie</p>
      </div>
    </div>
    </>
  );
}
