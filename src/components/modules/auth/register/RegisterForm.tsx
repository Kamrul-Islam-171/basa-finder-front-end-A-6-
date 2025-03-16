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
import { registrationSchema } from "./registerValidation";


const RegisterForm = () => {

  const form = useForm({
    resolver: zodResolver(registrationSchema)
  });
  const password = form.watch("password");
  const passwordConfirm = form.watch("confirmPassword");

  const onSubmit : SubmitHandler<FieldValues> = async(data) => {
    console.log(data)
  }

  const {
    formState: {isSubmitting},
  } = form;
  
  return (
    <div className=" flex flex-row-reverse items-center max-w-max gap-10 w-full p-5 ">
     <div>
     <div className="flex items-center space-x-2 mb-5 mt-5">
        <div className="w-[35px]">
        <Logo></Logo>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm text-gray-600">Enter your Info below to create your account</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">User Name</FormLabel>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                {passwordConfirm && password !== passwordConfirm ? (
                    <FormMessage>Password does not match
                    </FormMessage>
                ) : (
                    <FormMessage className="text-red-500" />
                )}
               
                {/* <FormMessage className="text-red-500" /> */}
              </FormItem>
            )}
          />
          <Button
          disabled={!!passwordConfirm && password !== passwordConfirm}
          type="submit" className="w-full cursor-pointer">
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        {`Already have an account ? `}
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </p>
     </div>
     <div className="hidden lg:block">
      <Image src={'https://res.cloudinary.com/dtp5fwvg9/image/upload/v1742134091/house_leobts.jpg'} width={430} height={430} alt="house"></Image>
     </div>
    </div>
  );
};

export default RegisterForm;
