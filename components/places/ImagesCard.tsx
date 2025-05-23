import Image from "next/image";
import { motion } from "framer-motion";
interface PlaceCardProps {
  image: string;
  name: string
}
export default function ImagesCard({ image,name }: PlaceCardProps) {
  return (
    <>
      <motion.div
        className=" overflow-hidden bg-white/10 backdrop-blur-md shadow-lg text-white w-full h-[300px] relative"
      >
        <Image
          src={image}
          alt="image"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
          <p className="text-white">{name}</p>
        </div>
      </motion.div>
    </>
  );
}
