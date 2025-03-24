

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt, FaBed } from "react-icons/fa";
import { TRentalHouse } from "@/types/rentHouse";
import Link from "next/link";

const RentalHouseCard = ({ house }: { house: TRentalHouse }) => {
  return (
    <div className=" rounded-lg  overflow-hidden shadow-lg bg-white">
      {/* Image section */}
      <div className="relative w-full h-64">
        <Image
          src={house.imageUrls[0]}
          alt="Rental House"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Card content */}
      <div className="p-4">
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <FaMapMarkerAlt className="text-red-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            {house.location}
          </h2>
        </div>
        <p className="text-sm text-gray-600 mt-2">{house.description}</p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            {house.rentAmount} Tk
          </span>
          <div className="flex items-center space-x-1">
             <FaBed className="text-primary" />
             <span>{house.noOfBedRooms} Beds</span>
          </div>
        </div>

        <div className="mt-4">
          <Link href={`/rental-listings/${house._id}`}>
            <Button className="cursor-pointer w-full">View Details</Button>
          </Link>
        </div>
      </div>
    </div>

  
  );
};

export default RentalHouseCard;
