import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth";

const authRoutes = ["/login", "/register"]; // ei route gula te jaite chaile atkabo na

const roleBasedPrivateRoutes = {
    admin:[/^\/admin/],
    landlord:[/^\/landlord/],
    tenant:[/^\/tenant/],
}
type Role = keyof typeof roleBasedPrivateRoutes;

export const middleware = async(request:NextRequest) => {

    const {pathname} = request.nextUrl; // which route i want to go
    // console.log(pathname)

    const userInfo = await getCurrentUser();
    // console.log("user = ",userInfo)

    if(!userInfo) {
        // console.log("i am in")
        if(authRoutes.includes(pathname)) {
            //if i want to go login and reg page. tokhon atkabo na
            return NextResponse.next();
        }
        else {
            return NextResponse.redirect(
                new URL(
                    `${process.env.NEXT_PUBLIC_REDIRECT_API || ""}/login?redirectPath=${pathname}`,
                    request.url
                )
            )
        }
    }

    if(userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
        const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
        if(routes.some(route => pathname.match(route))) {
            return NextResponse.next();
        }
    }
    return  NextResponse.redirect(new URL("/", request.url))
}

export const config = {
    // matcher er moddhe j j private route hobe tara thakbe
    matcher: [
      "/login",
    //   "/create-shop",
      "/admin",
      "/admin/:page",
    //   "/user",
      "/landlord",
      "/landlord/:page",
      "/tenant",
      "/tenant/:page",
     "/tenant/send-request/:id", 
    ], 
  };