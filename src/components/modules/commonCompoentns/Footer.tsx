import Logo from "@/components/shared/Logo";
// import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary  py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div>
          <div className="flex gap-1 items-center">
            {/* <div className="w-[40px] h-[40px]">
              <Image
                src="https://res.cloudinary.com/dtp5fwvg9/image/upload/v1739806738/bikerush_evxj9d.png"
                alt=""
                width={50}
                height={50}
              />
            </div> */}
            <div className="w-[30px] mr-2">
            <Logo></Logo>
            </div>
            <h2 className="text-2xl font-bold">Basa<span className="text-primary">Finder</span></h2>
          </div>
          <p className="mt-2 text-gray-400">
            Find Your Favoroute places to Stay and Happy with your family.
          </p>
        </div>

        {/* Menu & Pages */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Rental House
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to get updates on new arrivals and discounts.
          </p>
          <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-black focus:outline-none"
            />
            <button className="bg-primary px-4 py-2 cursor-pointer text-white">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-primary">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary">
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-5">
        &copy; 2025 YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
