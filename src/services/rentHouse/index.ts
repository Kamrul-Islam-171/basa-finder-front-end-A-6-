"use server"

import { TUpdateRentalHouse, TUpdateRentalStatus } from "@/types/rentHouse";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const CreateRentHouse = async(houseData : FieldValues) => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/add-rent-house`, {
            method:"POST",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(houseData)
        });
        const result = await res.json();

      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
export const CreateRentRequest = async(houseData : FieldValues) => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/rentRequest/rent-request`, {
            method:"POST",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(houseData)
        });
        const result = await res.json();

      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}

export const getRentHouseListings = async(page?:string | number, limit?:string | number, query?:{[key:string]:string|string[]|undefined}) => {
    // console.log(userData)
    const params = new URLSearchParams(); // multiple query set korbo
    if(query?.rentAmount) {
        params.append("minPrice", "0");
        params.append("maxPrice", query?.rentAmount.toString());
    }
    if(query?.noOfBedRooms) {
        params.append("noOfBedRooms", query?.noOfBedRooms.toString());
    }
    if(query?.location) {
        params.append("search", query?.location.toString());
    }
    // if(query?.page) {
    //     page = query.get('page')
    // }
    
    
    // console.log(params)


    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/get-all-listings?page=${page}&limit=${limit}&${params}`, {
            next: {
                tags: ["RENTHOUSE"],
                revalidate: 30
            }
        });
        const result = await res.json();

      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
export const getMyRentHouseListings = async(email:string) => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/get-all-listings/${email}`, {
            headers: {
                
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["RENTHOUSE"]
            }
        });
        const result = await res.json();

      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
export const getSingleRentHouse = async(id:string) => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`, {
            next: {
                tags: ["RENTHOUSE"]
            }
        });
        const result = await res.json();

      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
export const getRentHouseReqestAll = async() => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/rentRequest/get-all-rent-request`, {
            next: {
                tags: ["RENTHOUSE"]
            }
        });
        const result = await res.json();

      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
export const updateSingleRentHouse = async(id:string, updatedData : TUpdateRentalHouse) => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`, {
            method:"PATCH",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(updatedData)
           
        });
        revalidateTag('RENTHOUSE');
        const result = await res.json();


      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
export const updateRentStatus = async(updatedData : TUpdateRentalStatus) => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/rentRequest/change-status`, {
            method:"POST",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(updatedData)
           
        });
        revalidateTag('RENTHOUSE');
        const result = await res.json();


      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
export const DeleteSingleRentHouse = async(id:string) => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`, {
            method:"DELETE",
            headers: {
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            
           
        });
        revalidateTag('RENTHOUSE');
        const result = await res.json();
      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}

export const getAllRentRequestsForLandLord = async(page?:string|number, limit?:string|number) => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/rentRequest/all-rent-request?page=${page}&limit=${limit}`, {
            headers: {
                
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            next: {
                tags: ["RENTHOUSE"]
            }
        });
        const result = await res.json();

      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
export const getMyRentRequests = async() => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/rentRequest/rent-request`, {
            headers: {
                
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            // next: {
            //     tags: ["RENTHOUSE"]
            // }
        });
        const result = await res.json();

      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
export const getSingleRentRequests = async(id:string) => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/rentRequest/rent-request/${id}`, {
            headers: {
                
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            // next: {
            //     tags: ["RENTHOUSE"]
            // }
        });
        const result = await res.json();

      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}

export const CreatePayment = async(houseData : FieldValues) => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/create-payment`, {
            method:"POST",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body: JSON.stringify(houseData)
        });
        const result = await res.json();

      
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
