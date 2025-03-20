

"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { changePassword } from "@/services/auth";
import { toast } from "sonner";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
// import { useUser } from "@/context/UserContext";
import { changePasswordValidation } from "./PasswordChangeValidation";

const PassWordChange = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordValidation),
  });
  // const password = form.watch("password");
  // const passwordConfirm = form.watch("confirmPassword");
  // const {user,setIsLoading} = useUser();

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const userData = {
      oldPassword: data.password ,
      newPassword: data.newPassword
    }
   

    try {
      const res = await changePassword(userData); 
      
      if (res.success) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <div className=" flex flex-row-reverse  items-center max-w-2xl gap-10 w-full p-5 ">
      <div className="max-w-2xl w-full">
        <div className="flex items-center space-x-2 mb-5 mt-5">
         
          <div>
            <h1 className="text-xl font-semibold">Change Password</h1>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-10 max-w-2xl w-full"
          >
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                      className="max-w-2xl w-full"
                    />
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  {
                  // passwordConfirm && password !== passwordConfirm ? (
                  //   <FormMessage>Password does not match</FormMessage>
                  // ) : 
                  (
                    <FormMessage className="text-red-500" />
                  )}

                  {/* <FormMessage className="text-red-500" /> */}
                </FormItem>
              )}
            />

           
            <Button
              // disabled={!!passwordConfirm && password !== passwordConfirm}
              type="submit"
              className="w-full cursor-pointer"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
       
      </div>
     
    </div>
  );
};

export default PassWordChange;
