'use client';
import Hero from "@/components/Hero";
import History from "@/components/History";
import Navbar from "@/components/Navbar";
import PlaceCarousel from "@/components/PlaceCarousel";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
     <PlaceCarousel />
     <History/>
    </main>
  );
}



