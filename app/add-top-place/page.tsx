"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import API from "@/lib/axios";
import { AxiosError } from "axios";
import { getRole } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth"; 
import Loader from "@/components/Loader";
interface FormDataType {
  name: string;
  tag: string;
  image: File | null;
}
 
export default function AddPlacePage() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    tag: "",
    image: null,
  });

  const router = useRouter();

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("tag", formData.tag);
    if (formData.image) data.append("image", formData.image);

    try {
      await API.post("/places", data);
      toast.success("Place added successfully");
      setFormData({ name: "", tag: "", image: null });
    }catch (err: unknown) {
        const axiosError = err as AxiosError<{ msg: string }>;
        const errorMessage = axiosError.response?.data?.msg || "Login failed. Please try again.";
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 p-6 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold">Add New Place</h1>
        <input
          type="text"
          name="name"
          placeholder="Place Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/20 text-white placeholder-white"
        />
        <input
          type="text"
          name="tag"
          placeholder="Tag"
          value={formData.tag}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/20 text-white placeholder-white"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-white/20 text-white placeholder-white"
        />
        <button
          type="submit"
          className="w-full p-2 bg-lime-500 hover:bg-lime-400 text-black rounded font-semibold"
        >
          Add Place
        </button>
      </form>
    </div>
  );
}
