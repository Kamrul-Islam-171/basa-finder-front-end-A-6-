import PaymentForm from "@/components/modules/tenant/PaymentForm";
import {  getRentHouseReqestAll, getSingleRentRequests } from "@/services/rentHouse";


export async function generateStaticParams() {
    const rentRequests = await getRentHouseReqestAll(); // Fetch all rent requests
    // console.log("pay = ",rentRequests)

    return rentRequests?.data?.map((request: {_id:string}) => ({
        id: request?._id, // Ensure this matches the dynamic [id] parameter
    })) || [];
}

const PaymentPage = async({params} : {params: Promise<{id: string}>}) => {
    const {id} = await params;
    // const rentRequests = await getRentHouseReqestAll();
    // console.log("pay = ", rentRequests)
    
    const {data} = await getSingleRentRequests(id);
    // console.log(data)
    return (
        <div>
            <PaymentForm homeDetails={data}></PaymentForm>
        </div>
    );
};

export default PaymentPage;