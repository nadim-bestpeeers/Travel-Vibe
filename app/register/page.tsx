"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveToken, saveUser } from "@/utils/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { registerSchema } from "@/schemas/registerSchema"; 

interface RegisterResponse {
  token: string;
  userId: string;
  name: string;
  msg?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState<Partial<typeof formData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const fieldSchema = registerSchema.extract(name as keyof typeof formData);
    const { error } = fieldSchema.validate(value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error ? error.message : "",
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    const fieldSchema = registerSchema.extract(name as keyof typeof formData);
    const { error } = fieldSchema.validate(value);
  
    setFormErrors((prev) => ({
      ...prev,
      [name]: error ? error.message : "",
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = registerSchema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors: Partial<typeof formData> = {};
      error.details.forEach((err) => {
        const key = err.path[0] as keyof typeof formData;
        newErrors[key] = err.message;
      });
      setFormErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post<RegisterResponse>("http://localhost:5000/api/auth/register", formData);
      saveToken(res.data.token);
      saveUser(res.data.userId, res.data.name);
      toast.success("Registration successful!");
      router.push("/");
    } catch (err) {
      console.error(err);}
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/lb2.jpg')`,
        filter: "brightness(0.8) contrast(1.2)",
      }}
    >
      <div className="relative z-10 border border-white/10 bg-white/5  rounded-full p-10 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-lime-400 text-center mb-15">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white font-semibold placeholder-white/70 focus:outline-none"
            />
            {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 rounded-xl bg-white/10 font-semibold text-white placeholder-white/70 focus:outline-none"
            />
            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 rounded-xl bg-white/10 font-semibold text-white placeholder-white/70 focus:outline-none"
            />
            {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-50 ml-20 rounded-full bg-lime-600 hover:bg-lime-400 text-white p-3 font-semibold transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
