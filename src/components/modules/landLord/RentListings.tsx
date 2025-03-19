"use client";

import { TRentalHouse } from "@/types/rentHouse";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { BasaFinderTable } from "../BasaTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getMyRentHouseListings, updateSingleRentHouse } from "@/services/rentHouse";
import { toast } from "sonner";

const RentListings = () => {
  // {data} : {data: TRentalHouse[]}
  const [data, setData] = useState<TRentalHouse[] | []>([]);
  const [refresh, setRefresh] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);;
  const [currentHouse, setCurrentHouse] = useState<TRentalHouse | null>(null);

  const form = useForm();
  const { user } = useUser();

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      // console.log(user)
      const res = await getMyRentHouseListings(user?.email as string);
      
      setData(res?.data?.result);
      // console.log("singe = ", res)
    };
    fetchData();
  }, [user?.email, refresh]);
  // console.log(data)

  const columns: ColumnDef<TRentalHouse>[] = [
    {
      accessorKey: "name",
      header: () => <div>Location</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.imageUrls[0]}
            alt={row.original.location}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.location}</span>
        </div>
      ),
    },
    // {
    //   accessorKey: "isActive",
    //   header: () => <div>isActive</div>,
    //   cell: ({ row }) => (
    //     <div>
    //       {row.original.isActive ? (
    //         <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
    //           True
    //         </p>
    //       ) : (
    //         <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
    //           False
    //         </p>
    //       )}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "rentAmount",
      header: () => <div>Rent Amount</div>,
      cell: ({ row }) => <div>{row.original.rentAmount} Tk</div>,
    },
    {
      accessorKey: "noOfBedRooms",
      header: () => <div>Bed Rooms</div>,
      cell: ({ row }) => <div>{row.original.noOfBedRooms}</div>,
    },
    {
      accessorKey: "update",
      header: () => <div>Update</div>,
      cell: ({ row }) => (
        <button
          className="text-green-500 cursor-pointer"
          title="Update"
          //   onClick={() => handleDelete(row.original)}
          onClick={() => {
            setIsModalOpen(true)
            setCurrentHouse(row.original)
          }}
        >
          <Edit className="w-5 h-5" />
        </button>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500 cursor-pointer"
          title="Delete"
            onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (Data) => {
    if (!currentHouse) return; // Prevent submission if currentHouse is not set
  
    const updateData = {
      rentAmount: Data.rentAmount ? Number(Data.rentAmount) : currentHouse.rentAmount,
      noOfBedRooms: Data.noOfBedRooms ? Number(Data.noOfBedRooms) : currentHouse.noOfBedRooms,
    };
    // console.log(updateData);
    // console.log(currentHouse._id)
    try {
      const res = await updateSingleRentHouse(currentHouse?._id, updateData);
      // console.log(res);
      if(res?.success) {
        toast.success(res.message);
        setRefresh((prev) => !prev);
      }
      
    } catch (err: any) {
      toast.error(err?.message)
      console.log(err)
    }
  };

  const handleDelete = async(data : TRentalHouse) => {
    console.log(data)
  }
  

  return (
    <div>
      {/* <BasaFinderTable columns={columns} data={data || []}></BasaFinderTable> */}
      <BasaFinderTable columns={columns} data={data || []}></BasaFinderTable>

      <div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Rental</DialogTitle>
            </DialogHeader>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Rent House</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-10"
                  >
                    <FormField
                      control={form.control}
                      name="rentAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Rent Amount
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>

                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="noOfBedRooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            No of Bed Rooms
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>

                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full cursor-pointer">
                      {isSubmitting ? "Updating..." : "Update"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RentListings;
