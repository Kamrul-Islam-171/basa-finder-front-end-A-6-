export interface TRentalHouse {
    _id: string;
    location: string;
    amenities: string[]; 
    description: string;
    email: string;
    imageUrls: string[];
    noOfBedRooms: number;
    rentAmount: number;
    createdAt: string;
    updatedAt: string;
  }
export interface TUpdateRentalHouse {
   
    noOfBedRooms: number;
    rentAmount: number;
   
  }
  