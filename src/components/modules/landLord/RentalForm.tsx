"use client";

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// import { toast } from "sonner";
import { useUser } from "@/context/UserContext";


import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const CLOUDINARY_CLOUD_NAME = 'dtp5fwvg9'; // Replace with your Cloudinary Cloud Name
const UPLOAD_PRESET = 'myClouds'; // Replace with your Cloudinary Upload Preset

 const RentalForm = () => {
  const form = useForm({
    defaultValues: {
      location: "",
      description: "",
      rentAmount: "",
      noOfBedRooms: "",
      imageUrls: [] as File[],
      amenities:""
    },
  });
  const { user } = useUser();
  

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const uploadedImages: string[] = [];
    
    //uploading images to clodinary
    for (const file of data.imageUrls) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        uploadedImages.push(result.secure_url);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    
    try {

      const facilietes = data.amenities.split(",").map((item: string) => item.trim());

      const RentHouseData = {
        location: data.location,
        description: data.description,
        rentAmount: data.rentAmount,
        noOfBedRooms: data.noOfBedRooms,
        imageUrls: uploadedImages,
        amenities:facilietes,
        email:user?.email
      }

      console.log(RentHouseData)

    } catch (error) {
      console.error(error);
    }
  };

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  const [previewImages, setPreviewImages] = useState<string[]>([]);


  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    setValue("imageUrls", files as File[]); // Ensure it's always an array
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };
  // console.log(previewImages);

  return (
    <div className=" flex    gap-10 w-full p-5 ">
      <div className="w-full max-w-4xl">
        <div className="flex items-center max-w-4xl w-full space-x-2 mb-5 mt-5">
          <div className="w-[35px]">
            <Logo></Logo>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Create Rental House</h1>
            <p className="font-extralight text-sm text-gray-600">
              Enter your House Info
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-10  max-w-4xl w-full"
          >
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Location</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      //   type="text"
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
              name="rentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Rent Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ""} />
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
                    Number of Bed Rooms
                  </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ""} />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrls"
              render={() => (
                <FormItem>
                  <FormLabel className="font-semibold">Upload Images</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full py-6 px-4 border-2 border-dashed border-gray-300 rounded-lg  hover:bg-gray-50 transition duration-200">
                      <label
                        htmlFor="file-upload"
                        className="flex items-center space-x-2 text-gray-500"
                      >
                        {/* <HiCloudUpload className="text-2xl" /> */}
                        <span className="text-lg cursor-pointer">
                          Click to upload
                        </span>
                      </label>
                      <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        // {...field}
                        onChange={handleImageChange}
                        className="hidden "
                      />
                    </div>
                  </FormControl>
                  {/* <FormMessage>{errors.images?.message}</FormMessage> */}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {previewImages.length > 0 && (
              <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 ">
                {previewImages.map((src, index) => (
                  <div key={index} className="h-[100px]">
                    <Image
                      src={src}
                      alt={`Preview ${index}`}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover h-full bg-primary p-2"
                    />
                  </div>
                ))}
              </div>
            )}

            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Amenities</FormLabel>
                  <FormControl>
                    <Textarea
                      //   type="text"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};


export default RentalForm;


// {
//   "location": "Dhaka, gulah",
//   "amenities": ["wifi", "swimmingpool", "fan"],
//   "description": "very good",
//   "imageUrls": [
//     "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1742280120/mto0lpadnwbeznaf30lu.png",
//     "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1742280121/qcttdtw5jdqrqjv3gvmz.avif"
//   ],
//   "noOfBedRooms": "11",
//   "rentAmount": "123",
//   "email" : "kamrul@gmail.com"
// }
