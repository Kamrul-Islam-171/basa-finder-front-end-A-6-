"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async(userData : FieldValues) => {
    // console.log(userData)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, {
            method:"POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(userData)
        });
        const result = await res.json();

        

        // akhon taile r reg korar por log in kora lagbe na. karon cookie te accesstoken pabo. and navbar eo oi ta pia jabo
        if(result?.success) {
           ( await cookies()).set('accessToken', result?.data?.accessToken); // cokkie the set korbo. server action function r server component hoa lagbe
           ( await cookies()).set('refreshToken', result?.data?.refreshToken) ;
        }
        // console.log(result)
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}

export const loginUser = async(userData : FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method:"POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(userData)
        });
        const result = await res.json();
        if(result?.success) {
           ( await cookies()).set('accessToken', result?.data?.accessToken); // cokkie the set korbo. server action function r server component hoa lagbe
           ( await cookies()).set('refreshToken', result?.data?.refreshToken) ;
        }
        // console.log(result)
        return result;
        
    } catch (error: any) {
        return Error(error)
    }
}

export const getCurrentUser = async() => {
    const accessToken = (await cookies()).get('accessToken')?.value;

    let decodeUser = null;
    if(accessToken) {
        decodeUser = await jwtDecode(accessToken)
    }

    return decodeUser;
}

export const logout = async() => {
    (await cookies()).delete("accessToken");
}