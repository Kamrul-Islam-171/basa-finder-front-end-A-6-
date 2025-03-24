import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    location: "New York, USA",
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1735221019/samples/people/kitchen-bar.jpg",
    message: "Finding a rental was never this easy! I got my dream apartment in just a few days.",
  },
  {
    name: "Sarah Lee",
    location: "Toronto, Canada",
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1742374217/maacyzxhor6otqmepu0b.avif",
    message: "Great platform! The listings are accurate, and the process was seamless.",
  },
  {
    name: "Michael Smith",
    location: "London, UK",
    image: "https://res.cloudinary.com/dtp5fwvg9/image/upload/v1735221020/samples/people/boy-snow-hoodie.jpg",
    message: "I found the perfect house for my family. Highly recommended!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-10 mt-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 shadow-md bg-white rounded-xl">
              <FaQuoteLeft className="text-gray-300 text-4xl mb-4" />
              <p className="text-gray-700 italic">&ldquo;{testimonial.message}&rdquo;</p>
              <div className="flex items-center mt-4 space-x-4">
                <Avatar className="w-12 h-12 overflow-hidden rounded-full">
                  <Image src={testimonial.image} alt={testimonial.name} width={48} height={48} className="rounded-full object-cover" />
                </Avatar>
                <div>
                  <h4 className="text-md font-semibold text-gray-800">{testimonial.name}</h4>
                  <span className="text-sm text-gray-500">{testimonial.location}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
