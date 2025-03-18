import RentHouseDetails from "@/components/modules/commonCompoentns/RentHouseDetails";
import { getSingleRentHouse } from "@/services/rentHouse";


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