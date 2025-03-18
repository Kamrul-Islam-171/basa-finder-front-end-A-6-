import RentalListingsComponent from "@/components/modules/commonCompoentns/RentalListingsComponent";
import { getRentHouseListings } from "@/services/rentHouse";


const RentalListingsPage = async() => {
    // const {data} = await getRentHouseListings();
    const response = await getRentHouseListings();
    const listings = response?.data?.result || []; // Ensure it's an array
    // console.log(data.result)
    return (
        <div>
           <RentalListingsComponent data={listings}></RentalListingsComponent>
        </div>
    );
};

export default RentalListingsPage;