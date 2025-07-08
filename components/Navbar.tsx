
'use client';
import { Menu, Search } from 'lucide-react';
import Link from 'next/link'; 
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Logo from './Logo';
import { getToken, logout } from '@/utils/auth'; 
import { useEffect,useState } from 'react';
import toast from 'react-hot-toast';

const navItems = [
  { name: "Home", href: "/" },
  { name: "Places", href: "/places" },
  { name: "Culture", href: "/culture" },
  { name: "Food", href: "/food" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
  };

  return (
    <nav className="absolute top-0 w-full z-50 px-8 py-4 flex justify-between items-center text-white">
      <h1 className="text-3xl font-bold tracking-wide"><Logo/></h1>
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
       {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="relative text-md font-bold text-white hover:text-red-500 transition duration-300"
          >
            <span className="group relative inline-block">
              Logout
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </button>
        ) : (
          <Link
            href="/login"
            className="relative text-md font-bold text-white hover:text-lime-400 transition duration-300"
          >
            <span className="group relative inline-block">
              Login
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
        )}
      </div>
      <div className="flex gap-4">
        <Search className="w-5 h-5" />
        <Menu className="w-5 h-5 md:hidden" />
      </div>
    </nav>
  );
}
