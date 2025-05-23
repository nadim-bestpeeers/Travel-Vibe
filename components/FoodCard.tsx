import Image from "next/image";

type Props = {
  name: string;
  image: string;
  description: string;
  places: string[];
};

export default function FoodCard({ name, image, description, places }: Props) {
  return (
    <div className="bg-[#1a1f1e] rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lime-400/20 group">
      <Image
        src={image}
        alt={name}
        width={400}
        height={250}
        className="w-full h-48 object-cover group-hover:opacity-90 transition duration-300"
      />
      <div className="p-5">
        <h2 className="text-2xl font-bold text-lime-300 group-hover:text-lime-400">{name}</h2>
        <p className="text-sm text-gray-300 mt-2">{description}</p>
        <h3 className="mt-3 text-white font-semibold">Famous Places:</h3>
        <ul className="list-disc list-inside text-sm text-gray-400">
          {places.map((place, i) => (
            <li key={i}>{place}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
