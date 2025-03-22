import PaymentForm from "@/components/modules/tenant/PaymentForm";
import { getSingleRentRequests } from "@/services/rentHouse";


const PaymentPage = async({params} : {params: Promise<{id: string}>}) => {
    const {id} = await params;
    const {data} = await getSingleRentRequests(id);
    // console.log(data)
    return (
        <div>
            <PaymentForm homeDetails={data}></PaymentForm>
        </div>
    );
};

export default PaymentPage;