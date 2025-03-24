
import Footer from "@/components/modules/commonCompoentns/Footer";
import Navbar from "@/components/shared/NavBar";
import { ReactNode } from "react";
// import ScrollToTop from "react-scroll-to-top";
// import { FaArrowUp } from "react-icons/fa";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
       {/* <StickyHeadroom> */}
       {/* <ScrollToTop
      smooth
      component={<FaArrowUp size={20} />}
      className="!bg-blue-600 !text-white !rounded-full !shadow-lg "
    /> */}

        <Navbar></Navbar>
       {/* </StickyHeadroom> */}
       
      <div className="min-h-screen">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout
