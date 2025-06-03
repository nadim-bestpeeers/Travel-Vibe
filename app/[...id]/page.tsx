'use client'

import React from 'react';

import {places} from '@/data/allplaces';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';  
import GallerySlider from '@/components/GallerySlider';
import Testimonial from '@/components/Testimonial';


interface Props {
  params: {
    id: number;
  };
}
export default  function DetailPage({params}:Props) {
  const {id} = params;
 
  const place = places.find(place => place.id === Number(id));
  if (!place) {
    return <div className="text-center text-3xl text-lime-500 mt-20">Place not found</div>;
  }


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0b1d1a] text-amber-50">
      
      <section className="w-full max-w-3xl mx-auto mt-8">
      <GallerySlider images={place.images} />
      </section>
      <div className='mt-8  w-full max-w-3xl px-4 bg-[#bcd5af] text-[#141410]'>
        
        <h2 className="text-2xl font-semibold mt-6 text-[#39502c]">{place.name}</h2>
        <p className="text-lg text-[#89866f] mt-2">{place.description}</p>
        <div className="mt-4">
          <span className="text-sm text-[#141410]">Category: </span>
          <span className="text-sm text-lime-800">{place.tag}</span>
        </div>
      </div>
      <div className="mt-8 w-full px-4">
        <Testimonial />
      </div>
    </div>
  );
}