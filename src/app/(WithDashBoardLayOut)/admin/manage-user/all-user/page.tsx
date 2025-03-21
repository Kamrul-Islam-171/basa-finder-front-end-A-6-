import UserLists from "@/components/modules/admin/UserLists";
import { getAllUsers } from "@/services/adminAction";

type TSearchParams = Promise<{[key:string] : string | undefined}> 

const AllUserPage = async({searchParams} : {searchParams : TSearchParams}) => {
    const query = await searchParams;
    
   
    const page = query?.page;
    console.log(query)
    // const page = Array.isArray(query?.page) ? query.page[0] : query?.page;
    
   
    const pageNumber = page ? parseInt(page, 6) : 1;
    const res = await getAllUsers(pageNumber, 5);
    console.log(res);
    const userData = res?.data?.result || [];
    const totalpage = res?.data?.meta?.totalPage;
    return (
        <div>
            <UserLists userData={userData} page={totalpage}></UserLists>
        </div>
    );
};

export default AllUserPage;