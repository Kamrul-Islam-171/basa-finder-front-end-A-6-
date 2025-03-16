"use client"

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod';
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
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "./loginValidation";

const LoginForm = () => {

  const form = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit : SubmitHandler<FieldValues> = async(data) => {
    console.log(data)
  }

  const {
    formState: {isSubmitting},
  } = form;
  
  return (
    <div className=" flex max-w-max gap-10 w-full p-5 h-[450px]">
     <div>
     <div className="flex items-center space-x-2 mb-5 mt-5">
        <div className="w-[35px]">
        <Logo></Logo>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Enter your email below to login to your account</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
               
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
               
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full cursor-pointer">
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        {`Don't have an account ? `}
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
     </div>
     <div className="hidden lg:block">
      <Image src={'https://res.cloudinary.com/dtp5fwvg9/image/upload/v1742134091/house_leobts.jpg'} width={430} height={430} alt="house"></Image>
     </div>
    </div>
  );
};

export default LoginForm;
