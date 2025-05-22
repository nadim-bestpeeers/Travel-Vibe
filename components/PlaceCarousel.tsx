
'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import PlaceCard from './PlaceCard';
import { Autoplay } from 'swiper/modules';


const places = [
  {
    name: 'Rajwada Palace',
    image: '/images/rajwada.jpg',
    tag: 'Historical Landmark'
  },
  {
    name: 'Sarafa Night Market',
    image: '/images/sarafa.png',
    tag: 'Food Street'
  },
  {
    name: 'Khajrana Temple',
    image: '/images/khajrana.jpg',
    tag: 'Religious Site'
  },
  {
    name: 'Patalpani Waterfall',
    image: '/images/patalpani.jpg',
    tag: 'Nature Spot'
  },
  {
    name: 'Chappan Dukan',
    image: '/images/chappan.jpg',
    tag: 'Food Hub'
  },
  {
    name: 'Rajwada Palace',
    image: '/images/rajwada.jpg',
    tag: 'Historical Landmark'
  },
  {
    name: 'Sarafa Night Market',
    image: '/images/sarafa.png',
    tag: 'Food Street'
  },
  {
    name: 'Khajrana Temple',
    image: '/images/khajrana.jpg',
    tag: 'Religious Site'
  },
  {
    name: 'Patalpani Waterfall',
    image: '/images/patalpani.jpg',
    tag: 'Nature Spot'
  },
  {
    name: 'Chappan Dukan',
    image: '/images/chappan.jpg',
    tag: 'Food Hub'
  },
  
 

];

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
