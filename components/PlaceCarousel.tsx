
'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import PlaceCard from './PlaceCard';
import { Autoplay } from 'swiper/modules';
import { places } from '@/data/allplaces';


export default function PlaceCarousel() {
  return (
    <section className="bg-black px-6 md:px-16 py-12">
        <h1 className='text-2xl md:text-4xl font-bold mb-4'>Top Places</h1>
      <Swiper 
       modules={[Autoplay]}
       autoplay={{
         delay: 2500,
         disableOnInteraction: false,
       }} 
       spaceBetween={16} slidesPerView={1.3}  grabCursor={true} breakpoints={{ 768: { slidesPerView: 3.5 } } }>
        {places.map((place, index) => (
          <SwiperSlide key={index}>
            <PlaceCard {...place} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
