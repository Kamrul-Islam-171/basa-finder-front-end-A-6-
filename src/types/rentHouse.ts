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
export interface TUpdateRentalStatus {
   
    status: string;
    id:string;
   
  }
  

// export interface TRentalRequest {
//   _id: string;
//   houseId: string;
//   ownerEmail: string;
//   requestEmail: string;
//   moveInDate: string; 
//   duration: string;
//   specialRequests: string;
//   status: "pending" | "approved" | "rejected"; 
//   createdAt: string; 
//   updatedAt: string; 
//   __v: number;
// }  

interface House {
  _id: string;
  location: string;
  amenities: string[];
  description: string;
  imageUrls: string[];
  noOfBedRooms: number;
  rentAmount: number;
  email: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface TRentalRequest {
  _id: string;
  houseId: House;
  ownerEmail: string;
  requestEmail: string;
  isPayment:boolean;
  moveInDate: string; // ISO date string
  duration: string;
  specialRequests: string;
  status: "pending" | "approved" | "rejected"; // Assuming possible statuses
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
