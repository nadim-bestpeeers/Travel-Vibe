import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {
  _id: string;
  name: string;
  image: string;
  tag: string;
};

export default function PlaceCard({ name, image, tag, _id }: Props) {
  const router = useRouter();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg text-white w-full h-[300px] relative"
    >
      <Image
        src={`http://localhost:5000/uploads/${image}`}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
        <p className="text-xs uppercase opacity-80">{tag}</p>
        <h3 className="text-lg font-semibold">{name}</h3>
      </div>
      <button
        className="absolute bottom-2 right-2 px-3 py-1 bg-lime-300 text-black rounded-full hover:bg-lime-400 transition-all duration-300 cursor-pointer"
        onClick={() => router.push(`/${_id}`)}
      >
        View Details
      </button>
    </motion.div>
  );
}
