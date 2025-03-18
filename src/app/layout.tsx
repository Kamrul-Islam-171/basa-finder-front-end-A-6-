import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const robotoSans = Roboto({
//   variable: "--font-roboto-sans",
//   subsets: ["latin"],
//   weight: ["400", "700"], // Customize the font weights you need
// });

// const robotoMono = Roboto_Mono({
//   variable: "--font-roboto-mono",
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Choose the weights you need
});

export const metadata: Metadata = {
  title: "Basa Finder",
  description:
    "BasaFinder is a full-stack web application designed to offer a smart and seamless rental housing solution. It connects landlords, tenants, and admins, making it easier to manage rental properties and housing requests. Landlords can post, edit, and manage property listings, while tenants can search for, view, and request rentals. Upon approval of a rental request by the landlord, a payment option is unlocked for the tenant. Additionally, landlords can provide their contact details for further communication. BasaFinder ensures a smooth and efficient process for all users involved in the rental experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        // className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
        className={`${roboto.className} antialiased`}
        // className="font-helvetica antialiased"
      >
        <Providers>
          <Toaster richColors position="top-center"></Toaster>
          {children}
        </Providers>
      </body>
    </html>
  );
}
