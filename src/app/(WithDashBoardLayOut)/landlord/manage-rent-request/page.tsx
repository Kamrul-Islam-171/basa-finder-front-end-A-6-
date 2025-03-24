import ManageRequest from "@/components/modules/landLord/ManageRequest";
import { getAllRentRequestsForLandLord } from "@/services/rentHouse";
type TSearchParams = Promise<{[key:string] : string | undefined}> // karon multiple params aste pare

const ManageRentRequestPage = async({searchParams} : {searchParams : TSearchParams}) => {
    const query = await searchParams;
    
   
    const page = query?.page;
    // console.log(query)
    // const page = Array.isArray(query?.page) ? query.page[0] : query?.page;
    
   
    const pageNumber = page ? parseInt(page, 6) : 1;
    const res = await getAllRentRequestsForLandLord(pageNumber,5);
    const data = res?.data?.result || [];
    const totalPage = res?.data?.meta?.totalPage;
    // console.log(data)
    return (
        <div>
            <ManageRequest requestData={data} totalPage={totalPage}></ManageRequest>
        </div>
    );
};

export default ManageRentRequestPage;