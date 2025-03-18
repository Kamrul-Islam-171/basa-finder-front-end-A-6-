"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Menu, X, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";

import { useUser } from "@/context/UserContext";
import { logout } from "@/services/auth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const {user,  setIsLoading} = useUser();
  // console.log(user)

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    // logout korar por check kore dekhbe j amr current path ta private route er under e ki na.
    // tahole oi page theke kickout kore dibe
    // if(protectedRoutes.some((route) => pathname.match(route))) {
    //   router.push('/')
    // }

  }


  const routes = [
    { name: "Dashboard", href: `/${user?.role}/dashboard` },
    { name: "Rental Listings", href: "/rental-listings" },

    { name: "About", href: "/about" },
  ];

  return (
    <nav className="bg-white shadow-md w-full z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 tracking-wider"
            >
              <div className="flex gap-2 ">
                <div className="w-[30px]">
                  <Logo></Logo>
                </div>
                <span>Basa<span className="text-[var(--primary)]">Finder</span></span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8 md:items-center">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`relative  font-bold pb-1 tracking-wider transition-colors group ${
                  pathname === route.href
                    ? "text-[#e11d48]"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {route.name}
                <span
                  className={`absolute bottom-0 left-1/2 w-0 h-[2px] transition-all duration-300 ${
                    pathname === route.href
                      ? "bg-[#e11d48] group-hover:w-full group-hover:left-0"
                      : "bg-gray-900 group-hover:w-full group-hover:left-0"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsSearchOpen(true)}
              className="p-0 size-10 rounded-full hover:bg-gray-100 transition-colors hidden md:block cursor-pointer"
            >
              <Search className="text-gray-700" size={20} />
            </Button>
            { !user && <Link href="/login"><Button  className="cursor-pointer rounded-full hidden md:block">Login</Button></Link> }
            {/* <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button> */}

            { user && <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}

                  // onClick={handleLogout}
                >
                  <LogOut></LogOut> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden mt-4 pb-4"
        >
          <div className="flex flex-col space-y-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-semibold tracking-wider text-center pb-1 transition-colors ${
                  pathname === route.href
                    ? "text-[#e11d48] border-b-2 border-[#e11d48]"
                    : "text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-gray-500"
                }`}
              >
                {route.name}
              </Link>
            ))}
          </div>
          { !user &&  <div className="flex justify-center mt-2">
            <Link href="/login"><Button className="cursor-pointer hidden md:block">Login</Button></Link>
          </div>}
        </motion.div>
      )}

      {/* Fullscreen Search Bar */}
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-white z-[9999] flex flex-col items-center p-6 h-screen"
        >
          <div className="relative w-full max-w-3xl flex items-center">
            <Search className="absolute left-4 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-12 pr-20 py-3 text-lg border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-4 text-gray-500 text-lg"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
