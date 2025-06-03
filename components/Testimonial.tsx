'use client'
import Image from 'next/image';

import { testimonials } from '@/data/testimonial';

export default function TestimonialsSection() {
  return (
    <div className="py-12 ">
      <h2 className="text-3xl font-bold text-center mb-8">What People Say</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-[#39502c] text-white p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Image
                width={56}
                height={56}
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-[#d6d1ce]">{t.position}</p>
              </div>
            </div>
            <p className="text-[#d6d1ce]">&quot;{t.message}&quot;</p>
          </div>
        ))}
      </div>
    </div>
  );
}
