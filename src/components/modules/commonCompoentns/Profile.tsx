

"use client";

import { useUser } from "@/context/UserContext";
import { changeProfile, getUserDetails } from "@/services/auth";
import { useEffect, useState } from "react";
import Loading from "./Loading/Loading";

import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TUserDetails {
  name: string;
  email: string;
  isBlocked: boolean;
  role: string;
  _id: string;
}

const Profile = () => {
  const { user, isLoading, setIsLoading } = useUser();
  const [userDetails, setUserDetails] = useState<TUserDetails | undefined>(
    undefined
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    setIsLoading(true);

    const fetchUser = async () => {
      const res = await getUserDetails(user?.email as string);
      setUserDetails(res?.data);
      setIsLoading(false);
      
    };
    fetchUser();
  }, [user?.email, setIsLoading]);

  const onSubmit: SubmitHandler<FieldValues> = async (Data) => {
   
    // console.log(Data);
    try {
      const res = await changeProfile(Data);
      if(res?.success) {
        toast.success(res?.message);

         // Refetch user details after successful update
        const updatedUser = await getUserDetails(user?.email as string);
        setUserDetails(updatedUser?.data);
       
      }
    } catch (err: any) {
      toast.error(err?.message);
      console.log(err);
      setIsLoading(false);
    }

  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800">Profile</h2>
      <div className="mt-4">
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-bold text-gray-700">Name:</p>
            <p className="text-gray-600">{userDetails?.name}</p>
          </div>
          <div>
            <p className="font-bold text-gray-700">Email:</p>
            <p className="text-gray-600">{userDetails?.email}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="font-bold text-gray-700">Role:</p>
          <p className="text-gray-600">{userDetails?.role}</p>
        </div>

        {/* Edit Info Button */}
        <div className="flex justify-between">
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="cursor-pointer"
        >
          Edit Info
        </Button>
        <Button variant={'outline'} >
          <Link href={'/profile/change-password'}>Change Password</Link>
        </Button>
        </div>
      </div>

      <div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Your Info</DialogTitle>
            </DialogHeader>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Your Info</DialogTitle>
                </DialogHeader>
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
                          <FormLabel className="font-semibold">
                            Change User Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              required={true}
                              type="text"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>

                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full cursor-pointer">
                      {isSubmitting ? "Updating..." : "Update"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
