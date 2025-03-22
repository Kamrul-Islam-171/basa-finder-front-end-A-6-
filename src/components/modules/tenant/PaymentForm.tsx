"use client";

import { TRentalRequest } from "@/types/rentHouse";

import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
// import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
// import { loginUser } from "@/services/auth";
import {  useRouter } from "next/navigation";
import Loading from "../commonCompoentns/Loading/Loading";
import { useEffect } from 'react';
import { CreatePayment } from "@/services/rentHouse";

const PaymentForm = ({ homeDetails }: { homeDetails: TRentalRequest }) => {
//   console.log(homeDetails);

  const {  user, isLoading } = useUser();
 
  const form = useForm({
    // resolver: zodResolver(loginSchema)
    defaultValues: {
        name:  "",  
        email:  "",
        rentAmount: homeDetails?.houseId?.rentAmount || "", 
        paymentMethod: "BDT", 
      },
   
  });
//   console.log(user)
  //   const searchParams = useSearchParams();
  //   const redirect = searchParams.get('redirectPath'); // if there was any redicrect path .
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const rentData = {
      ...data,
      rentAmount: Number(data.rentAmount),
      id: homeDetails._id
    }
    console.log(rentData)
    try {
      const res = await CreatePayment(rentData);

      // console.log(res?.data?.paymentUrl);
      router.push(res?.data?.paymentUrl)
      
      // if (res.success) {
      //   toast.success(res?.message);
      //   if(redirect) {
      //     router.push(redirect)
      //   }
      //   else {
      //     router.push('/')
      //   }
      // } else {
      //   toast.error(res?.message);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    formState: { isSubmitting },
  } = form;
   // When user data is available, update the form values
   useEffect(() => {
    if (user) {
      form.reset({
        name: "",
        email: user?.email || "",
        rentAmount: homeDetails?.houseId?.rentAmount || "",
        paymentMethod: "BDT",
      });
    }
  }, [user, homeDetails, form.reset, form]);

  if(isLoading) return <Loading />
  return (
    <div className="container mx-auto flex flex-col items-center justify-center  lg:flex-row gap-10 p-2">
      <div>
        <Image
          src={homeDetails?.houseId?.imageUrls[0]}
          alt="HouseDetails"
          width={500}
          height={500}
        />
      </div>
      <div className="max-w-2xl w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Full Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input type="email"   disabled {...field} value={field.value || ""}  />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Rent Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      value={field.value || ""}
                      disabled={true}
                    //   value={field.value || ""}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Payment Method</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                    //   defaultValue={"BDT"}
                      disabled={true}
                      value={field.value || ""}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">
              {isSubmitting ? "Paying..." : "Pay Rent"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PaymentForm;



