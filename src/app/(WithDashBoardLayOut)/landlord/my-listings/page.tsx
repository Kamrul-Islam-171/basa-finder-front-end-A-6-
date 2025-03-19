import RentListings from "@/components/modules/landLord/RentListings";


const MyListingsPage = async() => {
    // const response = await getRentHouseListings();;
    // console.log(response)
    return (
        <div>
           <RentListings ></RentListings>
        </div>
    );
};

export default MyListingsPage;