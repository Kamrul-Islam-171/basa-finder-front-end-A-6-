
import RentRequestForm from "@/components/modules/tenant/RentRequestForm";
import { getRentHouseListings, getSingleRentHouse } from "@/services/rentHouse";

export async function generateStaticParams() {
    const houses = await getRentHouseListings(undefined, undefined, undefined);
    // console.log(house)
    return houses?.data?.result.map((house:{_id:string}) => ({
        id:house?._id,
    })) || []
}

const SendRentRequestPage = async({params}: {params:Promise<{id:string}>}) => {
    const {id} = await params;
        const response  = await getSingleRentHouse(id);
        // console.log(data)
        const houseData = response?.data || null;
    return (
        <div className="flex h-screen justify-center items-center">
            <RentRequestForm houseData={houseData}></RentRequestForm>
        </div>
    );
};

export default SendRentRequestPage;