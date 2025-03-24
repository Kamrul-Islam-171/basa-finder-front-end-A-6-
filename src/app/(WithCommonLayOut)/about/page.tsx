'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-6 md:px-16 py-10">
      {/* Mission Statement */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Our Mission</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          BasaFinder aims to revolutionize the rental housing market by seamlessly connecting landlords and tenants. 
          Our goal is to provide a smart, efficient, and secure platform for hassle-free renting.
        </p>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold text-primary mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['John Doe', 'Jane Smith', 'Michael Lee'].map((name, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="rounded-2xl shadow-md overflow-hidden">
                <CardContent className="p-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                  >
                    <Image 
                      src={`https://res.cloudinary.com/dtp5fwvg9/image/upload/v1742374217/maacyzxhor6otqmepu0b.avif`} 
                      alt={name} 
                      width={120} 
                      height={120} 
                      className="mx-auto rounded-full mb-4"
                    />
                  </motion.div>
                  <h3 className="text-xl font-medium">{name}</h3>
                  <p className="text-gray-500">Co-Founder & CEO</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold text-primary mb-6">Contact Us</h2>
        <p className="text-lg text-gray-600">We would love to hear from you!</p>
        <div className="mt-6 space-y-4">
          <p className="text-gray-700">📧 Email: support@basafinder.com</p>
          <p className="text-gray-700">📞 Phone: +123 456 7890</p>
          <p className="text-gray-700">🔗 Socials: @BasaFinder</p>
        </div>
        <Button className="mt-6 px-6 py-3 text-lg bg-primary text-white rounded-lg shadow hover:bg-primary/80">
          Get in Touch
        </Button>
      </motion.div>
    </div>
  );
};

export default AboutUs;
