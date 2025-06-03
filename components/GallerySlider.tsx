'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function GallerySlider({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-3xl mx-auto">

      <div className="relative w-full h-[400px] mb-4 overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[activeIndex]}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt="Main"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-3 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-14 h-14 flex-shrink-0 border-2 rounded-full transition-opacity duration-300 ${
              idx === activeIndex ? 'border-yellow-500 opacity-100' : 'opacity-70 border-transparent'
            }`}
          >
            <Image
              src={img}
              alt={`Thumb ${idx}`}
              width={96}
              height={64}
              className="object-cover w-full h-full rounded-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
