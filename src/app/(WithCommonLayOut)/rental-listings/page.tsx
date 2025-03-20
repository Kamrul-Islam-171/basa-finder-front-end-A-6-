import RentalListingsComponent from "@/components/modules/commonCompoentns/RentalListingsComponent";
import { getRentHouseListings } from "@/services/rentHouse";

type TSearchParams = Promise<{[key:string] : string | string[] | undefined}> // server component e ei vabe query params get korbo

const RentalListingsPage = async({searchParams} : {searchParams : TSearchParams}) => {
    // const {data} = await getRentHouseListings();

    // const searchParams = useSearchParams() // kora jabe na, karon server component.
    const query = await searchParams;
    // console.log(query)
    const response = await getRentHouseListings(undefined, undefined, query);
    const listings = response?.data?.result || []; // Ensure it's an array
    // console.log(data.result)
    return (
        <div>
           <RentalListingsComponent data={listings}></RentalListingsComponent>
        </div>
    );
};

export default RentalListingsPage;