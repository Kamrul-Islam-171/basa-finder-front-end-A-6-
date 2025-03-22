import TenantRequestList from "@/components/modules/tenant/TenantRequestList";
import { getMyRentRequests } from "@/services/rentHouse";


const MyRentRequestListPage = async() => {
    const res = await getMyRentRequests();
    const data = res?.data?.result || []

    return (
        <div>
            <TenantRequestList requestData={data}></TenantRequestList>
        </div>
    );
};

export default MyRentRequestListPage;