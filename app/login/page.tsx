"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { saveToken, saveUser } from "@/utils/auth";
import Link from "next/link";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface LoginResponse {
  token: string;
  userId: string;
  name: string;
  msg?: string;
  role: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<LoginResponse>("http://localhost:5000/api/auth/login", formData);
      saveToken(res.data.token);
      saveUser(res.data.userId, res.data.name, res.data.role);
      toast.success("Login successful!");

      router.push("/");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ msg: string }>;
      const errorMessage = axiosError.response?.data?.msg || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/lb2.jpg')`,
        filter: "brightness(0.8) contrast(1.2)",
      }}
    >
      <div className=" bg-white/5 border border-white/10 rounded-full p-10 shadow-xl max-w-md w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold font-sans mb-20 text-lime-400">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-full bg-white/10 text-white font-semibold placeholder-white/80 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-full bg-white/10 text-white font-semibold placeholder-white/80 focus:outline-none "
          />
          <button
            type="submit"
            className="w-50 ml-20 p-3 rounded-full bg-lime-600 hover:bg-lime-400 text-white transition font-semibold"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center text-lime-300 bg-white/20 p-3 rounded-full backdrop-blur-md">
          <span>
            Don&apos;t have an account?{" "}
            <Link
              href={"/register"}
              className="font-bold text-blue-500 hover:text-blue-900 mt-4 underline"
            >
              Register
            </Link>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
