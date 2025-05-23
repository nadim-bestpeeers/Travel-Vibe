
'use client';
import { Menu, Search } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 px-8 py-4 flex justify-between items-center text-white">
      <h1 className="text-3xl font-bold tracking-wide">Travel Vibe</h1>
      <div className="hidden md:flex  gap-6  text-sm font-medium">
        <a href="#">Home</a>
        <Link href="/places">Places</Link>
        <a href="#">Culture</a>
        <a href="#">Food</a>
        <a href="#">Contact</a>
      </div>
      <div className="flex gap-4">
        <Search className="w-5 h-5" />
        <Menu className="w-5 h-5 md:hidden" />
      </div>
    </nav>
  );
}
