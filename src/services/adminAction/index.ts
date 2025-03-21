"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUsers = async(page:string|number, limit:string|number) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/all-users?&role=tenant&role=landlord&page=${page}&limit=${limit}`, {
            next: {
                tags:["USERS"]
            },
            headers: {
                'Content-Type' : 'application/json',
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            
        });
        
        const result = await res.json();
        
        // console.log(result)
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
export const blockUnblockUser = async(id:string, isBlock:boolean) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}?isBlock=${isBlock}`, {
            method:"PATCH",
            headers: {
                // 'Content-Type' : 'application/json',
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            
        });
        revalidateTag("USERS");
        const result = await res.json();
        
        // console.log(result)
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}
export const changeUserRole = async(id:string, data : {role:string}) => {
    // console.log(data)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/change-role/${id}`, {
            method:"POST",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: (await cookies()).get("accessToken")!.value,
            },
            body:JSON.stringify(data)
            
            
        });
        revalidateTag("USERS");
        const result = await res.json();
        
        // console.log(result)
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}