import RentHouseDetails from "@/components/modules/commonCompoentns/RentHouseDetails";
import { getRentHouseListings, getSingleRentHouse } from "@/services/rentHouse";

export async function generateStaticParams() {
    const houses = await getRentHouseListings(); // Fetch all listings to generate static paths

    return houses?.data?.result.map((house: { _id: string }) => ({
        id: house._id, // Ensure this matches the dynamic [id] parameter
    })) || [];
}

const RentHouseDetailsPage = async({params} : {params: Promise<{id: string}>}) => {
    const {id} = await params;
    const response  = await getSingleRentHouse(id);
    // console.log(data)
    const houseData = response?.data || null;

    return (
        <div>
            <RentHouseDetails data={houseData}></RentHouseDetails>
        </div>
    );
};

export default RentHouseDetailsPage;


// import RentHouseDetails from "@/components/modules/commonCompoentns/RentHouseDetails";
// import { getRentHouseListings, getSingleRentHouse } from "@/services/rentHouse";


// export async function generateStaticParams() {
//     const houses = await getRentHouseListings(); // Fetch all listings to generate static paths

//     return houses?.data?.map((house: { id: string }) => ({
//         id: house.id, // Ensure this matches the dynamic [id] parameter
//     })) || [];
// }

// const RentHouseDetailsPage = async ({ params }: { params: { id: string } }) => {
//     const { id } = params; // No need to await params
//     const response = await getSingleRentHouse(id);
//     const houseData = response?.data || null;

//     return (
//         <div>
//             <RentHouseDetails data={houseData} />
//         </div>
//     );
// };

// export default RentHouseDetailsPage;
