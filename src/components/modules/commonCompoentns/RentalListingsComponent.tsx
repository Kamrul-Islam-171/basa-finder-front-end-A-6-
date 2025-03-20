import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { TRentalHouse } from '@/types/rentHouse';
import FilterSidebar from './FilterSidebar';

const RentalListingsComponent = ({ data } : {data : TRentalHouse[]}) => {
  // console.log(data)
  return (
    <div className="container mx-auto flex lg:flex-row  flex-col gap-8 mt-10">
      <div className='lg:max-w-xs w-full'>
        {/* sidebar */}
        <FilterSidebar />
      </div>

      <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
      {data.map((house, index) => (
        <div key={index} className=" rounded-lg overflow-hidden shadow-lg bg-white">
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
            <h2 className="text-xl font-semibold text-gray-800">{house.location}</h2>
            <p className="text-sm text-gray-600 mt-2">{house.description}</p>
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">{house.rentAmount} Tk</span>
              <span className="text-sm text-gray-600">{house.noOfBedRooms} Bedrooms</span>
            </div>
            
            <div className="mt-4">
              <Link href={`/rental-listings/${house._id}`}>
                <Button className="cursor-pointer">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>

    </div>
  );
};

export default RentalListingsComponent;
