"use server"

import { TUpdateRentalHouse } from "@/types/rentHouse";
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

export const getRentHouseListings = async() => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product/get-all-listings`, {
            next: {
                // tags: ["RENTHOUSE"]
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