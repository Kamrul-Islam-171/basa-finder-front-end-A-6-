"use client";
import { UserProvider } from "@/context/UserContext";
import { ReactNode } from "react";


const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );

  // now rap the root layout by this provider
};

export default Providers;
