import AdminRentListings from "@/components/modules/admin/AdminRentalListings";
import Loading from "@/components/modules/commonCompoentns/Loading/Loading";
import { Suspense } from "react";

const AdminListingPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <AdminRentListings />
      </Suspense>
    </div>
  );
};

export default AdminListingPage;
