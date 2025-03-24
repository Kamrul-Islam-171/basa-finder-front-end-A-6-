"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

import { toast } from "sonner";

import { useEffect} from "react";
import Loading from "../commonCompoentns/Loading/Loading";
import { CreateRentRequest } from "@/services/rentHouse";
import { TRentalHouse } from "@/types/rentHouse";

const RentRequestForm = ({ houseData }: {houseData: TRentalHouse}) => {
  const { user, isLoading } = useUser();
  // const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      rentDays: "",
      moveInDate: "",
      agreement: false,
    },
  });
  const { watch } = form;
  const isAgreed = watch("agreement");

  const onSubmit : SubmitHandler<FieldValues>  = async (data) => {
    console.log(data);

    const rentData = {
      houseId: houseData?._id,
      ownerEmail:  houseData?.email,
      requestEmail: data?.email,
      moveInDate: data?.moveInDate,
      duration: data?.rentDays,
      specialRequests: data?.message,
      // status:"pending"
    }
    console.log(rentData);

    try {
      const res = await CreateRentRequest(rentData);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: "",
        email: user?.email || "",

        message: "",
        agreement: false,
      });
    }
  }, [user, form.reset, form]);

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="flex flex-col max-w-lg w-full p-5 space-y-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-xl font-semibold text-center">Rent Request Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="moveInDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Move In Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    required={true}
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rentDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rent Time</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Rental Duration (e.g., 5 days, 2 weeks)" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Any special requests?" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreement"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>I agree to the terms and conditions</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!isAgreed} className="w-full">
            Submit Request
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RentRequestForm;
