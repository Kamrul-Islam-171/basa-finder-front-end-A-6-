"use client"
import { TRentalRequest } from "@/types/rentHouse";
import { BasaFinderTable } from "../BasaTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";




const TenantRequestList = ({
  requestData,
}: {
  requestData: TRentalRequest[];
}) => {
//   console.log(requestData);
const router = useRouter();

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
      cell: ({ row }) => (
        <div className="">{row.original.moveInDate}</div>
      ),
    },
    {
        accessorKey: "status",
        header: () => <div>Status</div>,
        cell: ({ row }) => (
          <div>
            {row.original.status === 'pending' ? (
              <p className="text-blue-500 border bg-blue-100 w-16 text-center px-1 rounded">
                Pending
              </p>
            ) : row.original.status === 'approved' ?  (
              <p className="text-green-500 border bg-green-100 w-20 text-center px-1 rounded">
                Approved
              </p>
            ) : (
                <p className="text-red-500 border bg-red-100 w-20 text-center px-1 rounded">
                Rejected
              </p>
            )
        
        }
          </div>
        ),
      },
    {
        accessorKey: "payment",
        header: () => <div>Payment</div>,
        cell: ({ row }) => (
          <div>
            {row.original.status === 'pending' || row.original.status === 'rejected' ? (
              <Button className="h-7 cursor-pointer" variant={"outline"} disabled={true}>
                Pay
              </Button>
            ) : !row.original.isPayment ? (
                <Button className="h-7 cursor-pointer" variant={"outline"} onClick={() => {router.push(`/payment/${row.original._id}`)}}>
                Pay
              </Button>
            ) : (
              <Button className="h-7 cursor-pointer" variant={"outline"} disabled={true} onClick={() => {router.push(`/payment/${row.original._id}`)}}>
                Paid
              </Button>
            )
        
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
    </div>
  );
};

export default TenantRequestList;
