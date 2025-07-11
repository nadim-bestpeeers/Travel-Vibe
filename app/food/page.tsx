"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import FoodCard from "@/components/FoodCard";
import {galleryImages } from "../../data/food";
import { motion } from "framer-motion";
import CursorTrail from "@/components/CursurTrail";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth"; 
import API from "@/lib/axios";
import Link from "next/link";
import { getRole } from "@/utils/auth";


const categories = ["All", "Snacks", "Sweets", "Drinks", "Street Food"];
interface FoodType {
  _id: string;
  name: string;
  image: string;
  description: string;
  places: string[];
  category: string;
}

export default function FoodPage() {
   const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allFoods, setAllFoods] = useState<FoodType[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<FoodType[]>([]);
  const role = getRole();
  const isAdmin = role === "admin";

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await API.get<FoodType[]>("/foods");
        setAllFoods(res.data);
        setFilteredFoods(res.data);
      } catch (err) {
        console.error("Error fetching foods:", err);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredFoods(allFoods);
    } else {
      setFilteredFoods(allFoods.filter((food) => food.category === selectedCategory));
    }
  }, [selectedCategory, allFoods]);


  return (
    <>
    <CursorTrail/>
    <div className="bg-[#0b1d1a] text-white min-h-screen ">
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
      <div className="flex m-5 justify-between items-center mb-4">
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          Top Foods
        </h1>
        {isAdmin && (
          <Link
            href="/add-food"
            className="px-4 py-2 bg-lime-500 text-black font-semibold rounded hover:bg-lime-400 transition"
          >
            + Add Food
          </Link>
        )}
      </div>
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

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4"
        data-aos="fade-up"
      >
        {filteredFoods.map((food) => (
          <FoodCard key={food._id} {...food} />
        ))}
      </div>

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
