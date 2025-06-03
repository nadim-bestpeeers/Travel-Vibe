"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook, ArrowUp } from "lucide-react";

const instagramImages = [
  "/images/insta1.jpg",
  "/images/insta2.jpg",
  "/images/insta3.jpg",
  "/images/insta4.jpg",
  "/images/insta5.jpg",
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden ">
      {/* Instagram Image Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full py-6 flex flex-col items-center space-y-4"
      >
        <div className="flex space-x-2 justify-center">
          {instagramImages.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Insta ${i + 1}`}
              width={80}
              height={80}
              className="rounded object-cover w-20 h-20"
            />
          ))}
        </div>
        <p className="text-sm">
          Follow us on Instagram{" "}
          <span className="font-semibold">@TheTravelVibe</span>
        </p>
      </motion.div>

      {/* Animated Forest Divider with Inline SVG */}
      <motion.div
        className="w-full h-24   overflow-hidden  "
      > 
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full h-full "
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            fill="#214d36"
            animate={{
              d: [
                "M0,10 C180,80 360,20 540,70 C720,100 850,40 1080,80 C1260,120 1440,60 1440,60 L1440,100 L0,100 Z",
                "M0,40 C180,60 360,30 540,50 C720,80 900,60 1080,70 C1260,100 1440,70 1440,70 L1440,100 L0,100 Z",
                "M0,10 C180,80 360,20 540,70 C720,100 850,40 1080,80 C1260,120 1440,60 1440,60 L1440,100 L0,100 Z",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Main Footer */}
      <div className="bg-[#214d36]  text-white py-10 px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold mb-2">About Us</h3>
          <ul className="space-y-1 text-sm">
            <li>Programs</li>
            <li>Events</li>
            <li>Blog</li>
            <li>Join Our Team</li>
          </ul>
          <div className="flex space-x-3 pt-4">
            <Instagram className="w-5 h-5" />
            <Facebook className="w-5 h-5" />
          </div>
        </div>

        {/* Middle Column */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2">Get Updates</h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter to receive updates and special
            announcements.
          </p>
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded bg-white text-black"
            />
            <input
              type="text"
              placeholder="First Name"
              className="px-4 py-2 rounded bg-white text-black"
            />
            <button className="bg-[#fdf6eb] text-[#214d36] font-bold py-2 px-6 rounded hover:bg-white transition">
              Sign Up
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <h3 className="text-lg font-bold mb-2">Send Us A Message</h3>
          <p className="text-sm mb-2">(845)-356-1234</p>
          <p className="text-sm">
            285 Hungry Hollow Road
            <br />
            Chestnut Ridge, NY 10977
          </p>
          <Image
            src="/images/logo-footer.svg"
            alt="Logo"
            width={100}
            height={50}
            className="mt-4"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#1b3c2d] text-white text-xs py-4 px-6 text-center">
        <p>© 2025 The Nature Place Day Camp. All Rights Reserved</p>
        <p className="mt-1">Privacy Policy · Website by B2S Studio</p>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed  bottom-6 right-8 bg-[#214d36] text-white p-3 rounded-full shadow-lg hover:bg-[#1b3c2d] transition z-50 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </footer>
  );
}
