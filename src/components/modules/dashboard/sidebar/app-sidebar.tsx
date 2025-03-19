"use client"

import * as React from "react"
import {
 
  Bot,
 
 
  Settings2,
  SquareTerminal,
} from "lucide-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
// import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import Link from "next/link"
import Logo from "@/components/shared/Logo"
import { useUser } from "@/context/UserContext"




// const navData = {

//   admin: [
//     {
//       title: "Dashboard",
//       url: "/admin/dashboard",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [{ title: "Admin Dashboard", url: "/admin/dashboard" }],
//     },
//     {
//       title: "Manage User",
//       url: "/admin/manage-user/all-user",
//       icon: Bot,
//       items: [{ title: "Manage All User", url: "/admin/manage-user/all-user" }],
//     },
//     {
//       title: "Settings",
//       url: "/admin/settings",
//       icon: Settings2,
//       items: [{ title: "Profile", url: "/profile" }],
//     },
//   ],

//   landlord: [
//     {
//       title: "Dashboard",
//       url: "/landlord/dashboard",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [{ title: "Landlord Dashboard", url: "/landlord/dashboard" }],
//     },
//     {
//       title: "Manage User",
//       url: "/landlord/manage-user/all-user",
//       icon: Bot,
//       items: [{ title: "Manage All User", url: "/landlord/manage-user/all-user" },
//         { title: "Manage Rental House", url: "/landlord/create-rental-house" },
//         { title: "My Listings", url: "/landlord/my-listings" }
//       ],
//     },
   
//     {
//       title: "Settings",
//       url: "/landlord/settings",
//       icon: Settings2,
//       items: [{ title: "Profile", url: "/profile" }],
//     },
//   ],

//   tenant: [
//     {
//       title: "Dashboard",
//       url: "/tenant/dashboard",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [{ title: "Tenant Dashboard", url: "/tenant/dashboard" }],
//     },
//     {
//       title: "Manage Request",
//       url: "/tenant/manage-request/all-rent-requests",
//       icon: Bot,
//       items: [{ title: "My Rent Request ", url: "/tenant/manage-request/all-rent-requests" }],
//     },
//     {
//       title: "Settings",
//       url: "/tenant/settings",
//       icon: Settings2,
//       items: [{ title: "Profile", url: "/profile" }],
//     },
//   ],
// };


// const data = {
 
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "/admin/dashboard",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "Admin Dashboard",
//           url: "/admin/dashboard",
//         }
//       ],
//     },
//     {
//       title: "Manage User",
//       // url: "#",
//       url: "/admin/manage-user/all-user",
//       icon: Bot,
//       items: [
//         {
//           title: "Manage All User",
//           url: "/admin/manage-user/all-user",
//         },
        
//       ],
//     },
    
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "Profile",
//           url: "/profile",
//         },
//       ],
//     },
//   ],
  
 
// }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {user} = useUser();

  const navData = {

    admin: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: SquareTerminal,
        isActive: true,
        items: [{ title: "Admin Dashboard", url: "/admin/dashboard" }],
      },
      {
        title: "Manage User",
        url: "/admin/manage-user/all-user",
        icon: Bot,
        items: [{ title: "Manage All User", url: "/admin/manage-user/all-user" }],
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings2,
        items: [{ title: "Profile", url: "/profile" }],
      },
    ],
  
    landlord: [
      {
        title: "Dashboard",
        url: "/landlord/dashboard",
        icon: SquareTerminal,
        isActive: true,
        items: [{ title: "Landlord Dashboard", url: "/landlord/dashboard" }],
      },
      {
        title: "Manage User",
        url: "/landlord/manage-user/all-user",
        icon: Bot,
        items: [{ title: "Manage All User", url: "/landlord/manage-user/all-user" },
          { title: "Manage Rental House", url: "/landlord/create-rental-house" },
          { title: "My Listings", url: `/landlord/my-listings` }
        ],
      },
     
      {
        title: "Settings",
        url: "/landlord/settings",
        icon: Settings2,
        items: [{ title: "Profile", url: "/profile" }],
      },
    ],
  
    tenant: [
      {
        title: "Dashboard",
        url: "/tenant/dashboard",
        icon: SquareTerminal,
        isActive: true,
        items: [{ title: "Tenant Dashboard", url: "/tenant/dashboard" }],
      },
      {
        title: "Manage Request",
        url: "/tenant/manage-request/all-rent-requests",
        icon: Bot,
        items: [{ title: "My Rent Request ", url: "/tenant/manage-request/all-rent-requests" }],
      },
      {
        title: "Settings",
        url: "/tenant/settings",
        icon: Settings2,
        items: [{ title: "Profile", url: "/profile" }],
      },
    ],
  };

  const menuItem = user?.role ?  navData[user?.role] || [] : [];
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-end  ">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Logo></Logo>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-xl text-[var(--primary)]">Basa Finder</span>
                  
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItem} />
        {/* <NavProjects projects={data.projects} /> */}
       
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
