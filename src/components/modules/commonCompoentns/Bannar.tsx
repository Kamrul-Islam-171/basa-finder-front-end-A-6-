import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Banner() {
  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtp5fwvg9/image/upload/v1742737924/rent_b7ygdt.jpg')",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black opacity-50" />

      <div className="relative text-center text-white px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Find Your Perfect Rental House Today!
        </h1>
        <Button className="cursor-pointer text-white px-6 py-3 rounded-lg mt-4">
          <Link href="/landlord/create-rental-house">Post Rental House Info</Link>
        </Button>
      </div>
    </div>
  );
}
