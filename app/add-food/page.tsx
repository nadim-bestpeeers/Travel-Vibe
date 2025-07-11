"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import API from "@/lib/axios";
import { getRole } from "@/utils/auth";
import { isAuthenticated } from "@/utils/auth";
import Loader from "@/components/Loader";
import { AxiosError } from "axios";

const categories = ["Snacks", "Sweets", "Drinks", "Street Food"];

export default function AddFoodPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: categories[0],
    places: "",
    image: null as File | null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      const auth = isAuthenticated();
      const role = getRole();

      if (!auth || role !== "admin") {
        router.replace("/");
      } else {
        setLoading(false);
      }
    };

    checkAccess();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("places", formData.places);
    if (formData.image) data.append("image", formData.image);

    try {
      await API.post("/foods", data);
      toast.success("Food added successfully!");
      router.push("/food");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ msg: string }>;
      const errorMessage =
        axiosError.response?.data?.msg || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1d1a] flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0b1d1a] text-white flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-6 rounded-xl w-full max-w-xl space-y-4 shadow-lg backdrop-blur-lg"
      >
        <h1 className="text-3xl font-bold text-lime-400 text-center">
          Add New Food
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/20 text-white placeholder-white"
        />

        <textarea
          name="description"
          placeholder="Food Description"
          required
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/20 text-white placeholder-white"
          rows={3}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/20 text-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-black text-white">
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="places"
          placeholder="Famous Places (comma separated)"
          required
          value={formData.places}
          onChange={handleChange}
          className="w-full p-3 rounded bg-white/20 text-white placeholder-white"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full p-3 rounded bg-white/20 text-white"
        />

        <button
          type="submit"
          className="w-full bg-lime-500 hover:bg-lime-400 text-black font-semibold p-3 rounded transition"
        >
          Add Food
        </button>
      </form>
    </div>
  );
}
