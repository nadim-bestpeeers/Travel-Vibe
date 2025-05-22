
import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {
  name: string;
  image: string;
  tag: string;
};

export default function PlaceCard({ name, image, tag }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg text-white w-full h-[300px] relative"
    >
      <Image src={image} alt={name} layout="fill" objectFit="cover" className="z-0" />
      <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
        <p className="text-xs uppercase opacity-80">{tag}</p>
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
    </motion.div>
  );
}
