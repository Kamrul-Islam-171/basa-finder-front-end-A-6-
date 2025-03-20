"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const FilterSidebar = () => {
    const [price, setPrice] = useState([0]);
    const [berooms, setBedrooms] = useState([0]);
    // const [isLoading, setIsLoading] = useState(false);
    const [resetKey, setResetKey] = useState(0); //  Added resetKey to force re-render

    const [searchValue, setSearchValue] = useState("");

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(()=> {
      router.push(`${pathname}`, { scroll: false }); // refresh dileo query params delete hobe

    }, [])
    const handleSearchQuery = (query:string, value:string | number) => {
        // console.log(query, value);

        const params = new URLSearchParams(searchParams.toString());
        params.set(query, value.toString()); // for multiple query
        router.push(`${pathname}?${params.toString()}`, {
            scroll:false
        })
        // console.log(params)
    }

    const handleClearFilters = () => {
        setResetKey((prev) => prev + 1); // Force re-render by updating key
        setPrice([0]);
        setSearchValue("");
        setBedrooms([0]);
        router.push(`${pathname}`, { scroll: false });
      };

      const handleSearch = (e: React.ChangeEvent<HTMLInputElement>, query:string) => {
        // console.log(e.target.value);
        setSearchValue(e.target.value)
        const params = new URLSearchParams(searchParams.toString());
        // params.set(query, e.target.value.toString()); // for multiple query
        params.set(query, searchValue); // for multiple query
        router.push(`${pathname}?${params.toString()}`, {
            scroll:false
        })
      }

    return (
        <div className="p-6  bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Filter</h2>
        {searchParams.toString().length > 0 && (
          <Button
            // onClick={() => {
            //   router.push(`${pathname}`, {
            //     scroll: false,
            //   }); // query parameter gula sob clear korbe
            // }}
            onClick={handleClearFilters}
            size="sm"
            className="cursor-pointer ml-5"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Filter by Price */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Rent Amount</h2>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>0</span>
          <span>50000</span>
        </div>
        <Slider
          max={50000}
          key={resetKey} //  Added key to force re-render on reset
          step={1}
          onValueChange={(value) => {
            setPrice(value);
            handleSearchQuery("rentAmount", value[0]); // query name and query value ta pathabo
          }}
          className="w-full"
        />
        <p className="text-sm mt-2">Selected Price: {price[0]}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">No of bed rooms</h2>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>0</span>
          <span>200</span>
        </div>
        <Slider
          max={200}
          step={1}
          key={resetKey + 1}
          
          onValueChange={(value) => {
            setBedrooms(value);
            handleSearchQuery("noOfBedRooms", value[0]); // query name and query value ta pathabo
          }}
          className="w-full"
        />
        <p className="text-sm mt-2">Selected Rooms: {berooms[0]}</p>
      </div>
      {/* <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Search By Location</h2>
        <Input 
        value={searchValue}
        onChange={(e)=>handleSearch(e, "location")}
      
        
        />
      
      </div> */}

      <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Search By Location</h2>
      <div className="relative">
        <Input
          value={searchValue}
          onChange={(e) => handleSearch(e, "location")}
          className="pl-10" // Padding for the icon
        />
        <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
        {/* Positioned the Lucid-rect search icon inside the input */}
      </div>
    </div>
     
    </div>
    );
};

export default FilterSidebar;