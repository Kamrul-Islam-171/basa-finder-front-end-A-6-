import { z } from "zod";

export const rentalHouseValidation = z.object({
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  rentAmount: z.string().regex(/^\d+$/, "Rent amount must be a number"),
  noOfBedRooms: z.string().regex(/^\d+$/, "Number of bedrooms must be a number"),
//   imageUrls: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  imageUrls: z.array(z.custom<File>()).min(1, 'At least one image is required'),
  amenities: 
    z.string().min(1, "At least one amenity is required"), 
   
});


