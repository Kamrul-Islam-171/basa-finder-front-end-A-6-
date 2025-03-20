import RentalListingsComponent from "@/components/modules/commonCompoentns/RentalListingsComponent";
import { getRentHouseListings } from "@/services/rentHouse";

type TSearchParams = Promise<{[key:string] : string | string[] | undefined}> // server component e ei vabe query params get korbo

const RentalListingsPage = async({searchParams} : {searchParams : TSearchParams}) => {
    // const {data} = await getRentHouseListings();

    // const searchParams = useSearchParams() // kora jabe na, karon server component.
    const query = await searchParams;
    
    // Get 'page' from query, ensuring it's a string or number
    const page = Array.isArray(query?.page) ? query.page[0] : query?.page;
    
    // You can optionally parse the page to a number if needed (if it's a string)
    const pageNumber = page ? parseInt(page, 6) : 1; // Default to 1 if not available
    // const response = await getRentHouseListings(undefined, undefined, query);
    const response = await getRentHouseListings(pageNumber, 6, query);
    const listings = response?.data?.result || []; // Ensure it's an array
    // console.log(response)
    return (
        <div>
           <RentalListingsComponent data={listings} totalPage={response?.data?.meta?.totalPage}></RentalListingsComponent>
        </div>
    );
};

export default RentalListingsPage;