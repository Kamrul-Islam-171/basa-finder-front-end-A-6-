
import RentRequestForm from "@/components/modules/tenant/RentRequestForm";
import { getSingleRentHouse } from "@/services/rentHouse";


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