import Navbar from "@/components/shared/NavBar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
        <Navbar></Navbar>
      <div className="min-h-screen">{children}</div>
    </div>
  );
};

export default CommonLayout
