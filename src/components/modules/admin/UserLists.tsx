"use client";

import { IAllUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { BasaFinderTable } from "../BasaTable";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { blockUnblockUser, changeUserRole } from "@/services/adminAction";
import Pagination from "../commonCompoentns/Pagination";

const UserLists = ({ userData, page }: { userData: IAllUser[], page:number }) => {
  // const changeUserRole = async (newRole: string, id: string) => {
  //   console.log(newRole, id);
  // };

  const handleBlockUnblock = async (id: string, isBlock: boolean) => {
    // console.log(id, isBlock);
    try {
      const res = await blockUnblockUser(id, isBlock);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleChangeRole = async (id: string, role: string) => {
    // console.log(id, role);
    const newRoleData = { role: role };
    try {
      const res = await changeUserRole(id, newRoleData);
      // console.log(res)
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  const columns: ColumnDef<IAllUser>[] = [
    {
      accessorKey: "name",
      header: () => <div>Name</div>,
      cell: ({ row }) => <div className="">{row.original.name}</div>,
    },
    {
      accessorKey: "email",
      header: () => <div>Email</div>,
      cell: ({ row }) => <div className="">{row.original.email}</div>,
    },
    {
      accessorKey: "role",
      header: () => <div>Role</div>,
      cell: ({ row }) => <div className="">{row.original.role}</div>,
    },
    {
      accessorKey: "isActive",
      header: () => <div>isActive</div>,
      cell: ({ row }) => (
        <div>
          {!row.original.isBlocked ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <div>
          {!row.original.isBlocked ? (
            <Button
              onClick={() => handleBlockUnblock(row.original._id, true)}
              className="cursor-pointer h-7"
              variant={"outline"}
            >
              Block
            </Button>
          ) : (
            <Button
              onClick={() => handleBlockUnblock(row.original._id, false)}
              className="cursor-pointer h-7"
              variant={"outline"}
            >
              Unblock
            </Button>
          )}
        </div>
      ),
    },
    // {
    //   accessorKey: "rentAmount",
    //   header: () => <div>Rent Amount</div>,
    //   cell: ({ row }) => <div>{row.original.rentAmount} Tk</div>,
    // },
    // {
    //   accessorKey: "noOfBedRooms",
    //   header: () => <div>Bed Rooms</div>,
    //   cell: ({ row }) => <div>{row.original.noOfBedRooms}</div>,
    // },
    {
      accessorKey: "changeRole",
      header: () => <div>Change Role</div>,
      cell: ({ row }) => (
        <div>
          {row.original.role === "landlord" ? (
            <Button
              onClick={() => handleChangeRole(row.original._id, "tenant")}
              className="cursor-pointer h-7"
              variant={"outline"}
            >
              Tenant
            </Button>
          ) : (
            <Button
              onClick={() => handleChangeRole(row.original._id, "landlord")}
              className="cursor-pointer h-7"
              variant={"outline"}
            >
              Landlord
            </Button>
          )}
        </div>
      ),
    },
    // {
    //   accessorKey: "changeRole",
    //   header: () => <div>Change Role</div>,
    //   cell: ({ row }) => (
    //     <div>
    //       <Select
    //         onValueChange={(value) => changeUserRole(value, row.original._id)}
    //       >
    //         <SelectTrigger className="w-[180px]">
    //           <SelectValue placeholder="Change role" />
    //         </SelectTrigger>
    //         <SelectContent>
    //           <SelectGroup>
    //             {/* <SelectLabel>Fruits</SelectLabel> */}
    //             <SelectItem className="cursor-pointer" value="landlord">
    //               Landlord
    //             </SelectItem>
    //             <SelectItem className="cursor-pointer" value="tenant">
    //               Tenant
    //             </SelectItem>
    //             {/* <SelectItem value="blueberry">Blueberry</SelectItem>
    //             <SelectItem value="grapes">Grapes</SelectItem>
    //             <SelectItem value="pineapple">Pineapple</SelectItem> */}
    //           </SelectGroup>
    //         </SelectContent>
    //       </Select>
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "action",
    //   header: () => <div>Action</div>,
    //   cell: ({ row }) => (
    //     <button
    //       className="text-red-500 cursor-pointer"
    //       title="Delete"
    //       onClick={() => handleDelete(row.original)}
    //     >
    //       <Trash className="w-5 h-5" />
    //     </button>
    //   ),
    // },
  ];

  return (
    <div>
      <BasaFinderTable
        columns={columns}
        data={userData || []}
      ></BasaFinderTable>
      
      <Pagination totalPage={page}></Pagination>
    </div>
  );
};

export default UserLists;
