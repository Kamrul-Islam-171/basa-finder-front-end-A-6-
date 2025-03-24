import { getRentHouseListings } from "@/services/rentHouse";
import RentalHouseCard from "./HouseCard";
import { TRentalHouse } from "@/types/rentHouse";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const FindRentalHouse = async() => {

    const res = await getRentHouseListings(1, 6, undefined);
    const data = res?.data?.result;
    console.log(data)
    return (
        <div className="container mx-auto p-4">
          <div className="flex justify-center">
          <div className="mt-20 text-center p-2 mb-5 max-w-xl space-y-3">
           <h1 className="text-2xl md:text-3xl font-bold lg:text-4xl">Find Your Perfect Home</h1>
           <p>Discover a variety of rental houses tailored to your needs. Whether you are looking for a cozy apartment or a spacious family home, we have the best options for you.</p>
           </div>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    data?.map((house:TRentalHouse) => <RentalHouseCard key={house._id} house = {house}></RentalHouseCard>)
                }
            </div>
            <div className="mt-5 flex justify-center">
                <Button><Link href={'/rental-listings'}>View More</Link></Button>
            </div>
        </div>
    );
};

export default FindRentalHouse;