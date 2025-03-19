


"use client";
import { TRentalHouse } from "@/types/rentHouse";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { Mail } from "lucide-react";
import { Dialog , DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";

const RentHouseDetails = ({ data }: { data: TRentalHouse }) => {
  // console.log(data);
  const [currentImage, setCurrentImage] = useState(data?.imageUrls[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm();
  const {user} = useUser();

  const {
    formState: {isSubmitting},
  } = form;

  const onSubmit : SubmitHandler<FieldValues> = async(requestData) => {
      console.log(requestData);
      console.log(data?.email); // need to pass into backend

      const rentData = {
        houseId: data?._id,
        ownerEmail : data?.email,
        requestEmail: user?.email,
        ...requestData,
        // status:"pending"
      }

      console.log(rentData)

      // {
      //   ownerEmail, requestEmail, ...data, status:pending
      // }
      // try {
        
      // } catch (error) {
      //   console.error(error);
      // }
      
    }

  

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Image */}
        <div className="space-y-4">
          <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={currentImage}
              alt="House image"
              width={800}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnail Images */}
          <div className="flex gap-4 h-[100px]">
            {data?.imageUrls?.map((image, idx) => (
              <div
                key={idx}
                className={`h-[100px] w-[100px] rounded-lg overflow-hidden cursor-pointer shadow-sm transition-all ${
                  image === currentImage ? "border-2 border-primary" : "border-2 border-gray-300"
                }`}
                onClick={() => setCurrentImage(image)}
              >
                <Image
                  src={image}
                  alt="Thumbnail"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{data?.location}</h1>
          <p className="text-gray-600 text-lg">{data?.description}</p>

          {/* Rent and Bedrooms */}
          <div className="flex items-center justify-between text-xl font-semibold text-gray-800">
            <span>Rent: <span className="text-green-600">${data?.rentAmount}/month</span></span>
            <span>🛏 {data?.noOfBedRooms} Bedrooms</span>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Amenities : </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {data?.amenities?.map((amenity, idx) => (
                <Badge key={idx} className="bg-primary text-white">{amenity}</Badge>
              ))}
            </div>
          </div>

        



          {/* Contact Button */}
          <div className="mt-4 space-y-4">
            {/* <Button className="w-full flex items-center gap-2 text-lg">
              <Mail className="w-5 h-5" /> Contact Owner
            </Button> */}
            <Button className="w-full cursor-pointer text-white" onClick={() => setIsModalOpen(true)}>
              Request Rental
            </Button>
          </div>
        </div>
      </div>




      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Rental</DialogTitle>
          </DialogHeader>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Rental</DialogTitle>
          </DialogHeader>
          <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
          <FormField
            control={form.control}
            name="moveInDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Move In Date</FormLabel>
                <FormControl>
                  <Input type="date" required={true} {...field} value={field.value || ""} />
                </FormControl>
               
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Duration</FormLabel>
                <FormControl>
                  <Input type="text" required={true} {...field} value={field.value || ""} placeholder="Rental Duration (e.g., 5 days, 6 months, 1 year)" />
                </FormControl>
               
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Special Requests</FormLabel>
                <FormControl>
                  <Textarea  {...field} value={field.value || ""} placeholder="Any special requests?" />
                </FormControl>
               
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full cursor-pointer">
            {isSubmitting ? "Requsting..." : "Request"}
          </Button>
        </form>
      </Form>
        </DialogContent>
      </Dialog>
        </DialogContent>
      </Dialog>


    </div>
  );
};

export default RentHouseDetails;
