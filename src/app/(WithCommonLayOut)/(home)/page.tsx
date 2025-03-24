import Banner from "@/components/modules/commonCompoentns/Bannar";
import FindRentalHouse from "@/components/modules/commonCompoentns/FindRentalHouse";
import RentingTips from "@/components/modules/commonCompoentns/RentTips";
import Testimonials from "@/components/modules/commonCompoentns/Testimonials";



const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <FindRentalHouse></FindRentalHouse>
            <Testimonials></Testimonials>
            <RentingTips></RentingTips>
        </div>
    );
};

export default HomePage;