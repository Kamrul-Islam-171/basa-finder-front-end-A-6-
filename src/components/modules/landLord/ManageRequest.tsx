"use client";
import { TRentalRequest } from "@/types/rentHouse";
import { BasaFinderTable } from "../BasaTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { updateRentStatus } from "@/services/rentHouse";
import { toast } from "sonner";
import Pagination from "../commonCompoentns/Pagination";
// import { useRouter } from "next/navigation";

const ManageRequest = ({ requestData, totalPage }: { requestData: TRentalRequest[], totalPage:number }) => {
  // const router = useRouter();
  // console.log(requestData)
  const isDisabled = (status: string) => {
    return status === "rejected" || status === "approved";
  };

  const handleChangeStatus = async(id: string, status: string) => {
    const statusData = {
      id,
      status
    }
    try {
      const res = await updateRentStatus(statusData);
      if(res?.success) {
        toast.success(res?.message);
      }
      else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error?.message);

    }
  }

  const columns: ColumnDef<TRentalRequest>[] = [
    {
      accessorKey: "location",
      header: () => <div>Location</div>,
      cell: ({ row }) => (
        <div className="">{row.original.houseId.location}</div>
      ),
    },
    {
      accessorKey: "rentAmount",
      header: () => <div>Rent Amount</div>,
      cell: ({ row }) => (
        <div className="">{row.original.houseId.rentAmount} Tk</div>
      ),
    },
    {
      accessorKey: "moveInDate",
      header: () => <div>Move In Date</div>,
      cell: ({ row }) => <div className="">{row.original.moveInDate}</div>,
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => (
        <div>
          {row.original.status === "pending" ? (
            <p className="text-blue-500 border bg-blue-100 w-16 text-center px-1 rounded">
              Pending
            </p>
          ) : row.original.status === "approved" ? (
            <p className="text-green-500 border bg-green-100 w-20 text-center px-1 rounded">
              Approved
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-20 text-center px-1 rounded">
              Rejected
            </p>
          )}
        </div>
      ),
    },
    // {
    //   accessorKey: "action",
    //   header: () => <div>Action</div>,
    //   cell: ({ row }) => (
    //     <div>
    //       {row.original.status === "pending" ||
    //       row.original.status === "rejected" ? (
    //         <div className="space-x-2">
    //           <Button
    //             className="h-7 cursor-pointer"
    //             variant={"outline"}
    //             // disabled={row.original.status === "rejected" || row.original.status === "approved"}
                
    //             disabled={isDisabled(row.original.status)}
    //           >
    //             Approve
    //           </Button>
    //           <Button
    //             className="h-7 cursor-pointer"
    //             variant={"outline"}
    //             // disabled={true}
    //             disabled={isDisabled(row.original.status)}
    //           >
    //             Reject
    //           </Button>
    //         </div>
    //       ) : !row.original.isPayment ? (
    //         <Button
    //           className="h-7 cursor-pointer"
    //           variant={"outline"}
    //           onClick={() => {
    //             router.push(`/payment/${row.original._id}`);
    //           }}
    //         >
    //           Pay
    //         </Button>
    //       ) : (
    //         <Button
    //           className="h-7 cursor-pointer"
    //           variant={"outline"}
    //           disabled={true}
    //           onClick={() => {
    //             router.push(`/payment/${row.original._id}`);
    //           }}
    //         >
    //           Paid
    //         </Button>
    //       )}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <div>
          {
          
            <div className="space-x-2">
              <Button
                className="h-7 cursor-pointer"
                variant={"outline"}
                // disabled={row.original.status === "rejected" || row.original.status === "approved"}
                
                disabled={isDisabled(row.original.status)}
                onClick={() => handleChangeStatus(
                  row.original._id,
                  "approved",
                 
                )}
              >
                Approve
              </Button>
              <Button
                className="h-7 cursor-pointer"
                variant={"outline"}
                // disabled={true}
                disabled={isDisabled(row.original.status)}
                // onClick={() => handleChangeStatus(row.original._id, "rejected")}
                onClick={() => handleChangeStatus(
                  row.original._id,
                  "rejected",
                
                )}
              >
                Reject
              </Button>
            </div>
          
          }
        </div>
      ),
    },
  ];

  return (
    <div>
      <BasaFinderTable
        columns={columns}
        data={requestData || []}
      ></BasaFinderTable>
      <Pagination totalPage={totalPage}></Pagination>
    </div>
  );
};

export default ManageRequest;


// "use client";
// import { TRentalRequest } from "@/types/rentHouse";
// import { BasaFinderTable } from "../BasaTable";
// import { ColumnDef } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";
// import { updateRentStatus } from "@/services/rentHouse";
// import { toast } from "sonner";
// import Pagination from "../commonCompoentns/Pagination";

// const ManageRequest = ({ requestData, totalPage }: { requestData: TRentalRequest[], totalPage: number }) => {
  
//   const isDisabled = (status: string) => {
//     return status === "rejected" || status === "approved";
//   };

//   const handleChangeStatus = async (
//     id: string,
//     status: string,
//     email: string,
//     location: string,
//     phoneNo: string,
//     rentAmount: number,
//     moveInDate: string
//   ) => {
//     const statusData = { id, status };
    
//     try {
//       const res = await updateRentStatus(statusData);
//       if (res?.success) {
//         toast.success(res?.message);

//         const emailRes = await fetch("/api/send-mail", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             status,
//             location,
//             rentAmount,
//             moveInDate,
//             phoneNo,
//           }),
//         });

//         const emailData = await emailRes.json();
//         if (emailData.success) {
//           toast.success("Email notification sent!");
//         } else {
//           toast.error("Failed to send email");
//         }
//       } else {
//         toast.error(res?.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const columns: ColumnDef<TRentalRequest>[] = [
//     {
//       accessorKey: "location",
//       header: () => <div>Location</div>,
//       cell: ({ row }) => <div>{row.original.houseId.location}</div>,
//     },
//     {
//       accessorKey: "rentAmount",
//       header: () => <div>Rent Amount</div>,
//       cell: ({ row }) => <div>{row.original.houseId.rentAmount} Tk</div>,
//     },
//     {
//       accessorKey: "moveInDate",
//       header: () => <div>Move In Date</div>,
//       cell: ({ row }) => <div>{row.original.moveInDate}</div>,
//     },
//     {
//       accessorKey: "status",
//       header: () => <div>Status</div>,
//       cell: ({ row }) => (
//         <div>
//           {row.original.status === "pending" ? (
//             <p className="text-blue-500 border bg-blue-100 w-16 text-center px-1 rounded">
//               Pending
//             </p>
//           ) : row.original.status === "approved" ? (
//             <p className="text-green-500 border bg-green-100 w-20 text-center px-1 rounded">
//               Approved
//             </p>
//           ) : (
//             <p className="text-red-500 border bg-red-100 w-20 text-center px-1 rounded">
//               Rejected
//             </p>
//           )}
//         </div>
//       ),
//     },
//     {
//       accessorKey: "action",
//       header: () => <div>Action</div>,
//       cell: ({ row }) => (
//         <div className="space-x-2">
//           <Button
//             className="h-7 cursor-pointer"
//             variant="outline"
//             disabled={isDisabled(row.original.status)}
//             onClick={() =>
//               handleChangeStatus(
//                 row.original._id,
//                 "approved",
//                 row.original.ownerEmail,
//                 row.original.houseId.location,
//                 "011234567891", // Example phone number
//                 row.original.houseId.rentAmount,
//                 row.original.moveInDate
//               )
//             }
//           >
//             Approve
//           </Button>
//           <Button
//             className="h-7 cursor-pointer"
//             variant="outline"
//             disabled={isDisabled(row.original.status)}
//             onClick={() =>
//               handleChangeStatus(
//                 row.original._id,
//                 "rejected",
//                 row.original.ownerEmail,
//                 row.original.houseId.location,
//                 "011234567891", // Example phone number
//                 row.original.houseId.rentAmount,
//                 row.original.moveInDate
//               )
//             }
//           >
//             Reject
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <BasaFinderTable columns={columns} data={requestData || []} />
//       <Pagination totalPage={totalPage} />
//     </div>
//   );
// };

// export default ManageRequest;
