'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/backg.png"
        alt="Indore city"
        layout="fill"
        objectFit="cover"
        className="brightness-[0.6]"
      />
      <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Indore, Madhya Pradesh
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-xl text-sm md:text-base"
        >
          Explore the cultural capital of Madhya Pradesh with vibrant food streets, historical monuments and a rich blend of heritage and modern lifestyle.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-fit px-6 py-2 bg-yellow-500 text-black rounded-full font-semibold"
        >
          Browse Destinations
        </motion.button>
      </div>
    </section>
  );
}
