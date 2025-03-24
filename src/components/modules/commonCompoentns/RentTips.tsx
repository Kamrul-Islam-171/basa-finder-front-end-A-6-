'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

const faq = [
  {
    question: "How do I set a realistic budget for renting?",
    answer: "Consider your monthly income and expenses. A general rule is that rent should not exceed 30% of your income."
  },
  {
    question: "What should I check in a neighborhood before renting?",
    answer: "Look for safety, amenities like grocery stores, public transport, and proximity to your workplace."
  },
  {
    question: "Why is reading the lease agreement important?",
    answer: "It outlines your rights and responsibilities as a tenant, including rent, maintenance, and eviction policies."
  },
  {
    question: "What should I inspect before moving into a rental?",
    answer: "Check for damages, water leaks, electrical issues, and ensure appliances are functioning properly."
  },
  {
    question: "What should I know about landlord policies?",
    answer: "Understand their maintenance responsibilities, rent increase policies, and terms for ending the lease."
  }
];

export default function RentingTips() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 px-4 md:px-10 max-w-4xl mx-auto ">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 "
      >
        Frequently Asked Questions About Renting
      </motion.h2>
      <div className="space-y-2">
        {faq.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="bg-white  shadow-lg">
              <CardHeader
                onClick={() => toggleAccordion(index)}
                className="flex items-center justify-between  cursor-pointer"
              >
                <CardTitle className="text-md md:text-lg font-medium">
                  {item.question}
                </CardTitle>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </CardHeader>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <CardContent className="p-4 border-t">
                  <p>{item.answer}</p>
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}