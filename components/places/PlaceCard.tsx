import Image from "next/image";
interface PlaceCardProps {
    name: string;
    image: string;
    tag: string;
}
export default function PlaceCard({name, image, tag}: PlaceCardProps) {
return(
    <>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg  hover:shadow-lime-300/50 transition-shadow duration-300 cursor-pointer">
            <Image src={image} alt={name} width={1000} height={200} layout="cover" className="w-full h-48 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold text-lime-300">{name}</h2>
            <p className="text-sm text-white">{tag}</p>
            <button className="mt-2 px-4 py-2 bg-lime-300 hover:bg-lime-400 transition-all duration-300 cursor-pointer text-black rounded-full">View Details</button>
        </div>
    </>
)
}