
'use client';
import { Menu, Search } from 'lucide-react';
import Link from 'next/link'; 
import clsx from "clsx";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Places", href: "/places" },
  { name: "Culture", href: "/culture" },
  { name: "Food", href: "/food" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="absolute top-0 w-full z-50 px-8 py-4 flex justify-between items-center text-white">
      <h1 className="text-3xl font-bold tracking-wide">Travel Vibe</h1>
      <div className="hidden md:flex  gap-6  text-sm font-medium">
      {navItems.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className={clsx(
            "relative text-md font-bold transition duration-300",
            "hover:text-lime-400",
            pathname === href ? "text-lime-400" : "text-white"
          )}
        >
          <span className="group relative inline-block">
            {name}
            <span
              className="absolute left-0 -bottom-1 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"
            ></span>
          </span>
        </Link>
      ))}
      </div>
      <div className="flex gap-4">
        <Search className="w-5 h-5" />
        <Menu className="w-5 h-5 md:hidden" />
      </div>
    </nav>
  );
}
