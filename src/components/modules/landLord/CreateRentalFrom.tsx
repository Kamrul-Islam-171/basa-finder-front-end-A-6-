'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Image from 'next/image';
// import { HiCloudUpload } from 'react-icons/hi';

const CLOUDINARY_CLOUD_NAME = 'dtp5fwvg9'; // Replace with your Cloudinary Cloud Name
const UPLOAD_PRESET = 'myClouds'; // Replace with your Cloudinary Upload Preset

const formSchema = z.object({
  images: z.array(z.custom<File>()).min(1, 'At least one image is required'),
});

export default function CreateRenalForm() {
  const { handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  const form = useForm();

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = async (data: { images: File[] }) => {
    setIsUploading(true);
    const uploadedImages: string[] = [];

    for (const file of data.images) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        uploadedImages.push(result.secure_url);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }

    setUploadedUrls(uploadedImages);
    setIsUploading(false);
    console.log('Uploaded Image URLs:', uploadedImages);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    setValue('images', files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>Upload Images</FormLabel>
          <FormControl>
            <div className="flex items-center justify-center w-full py-6 px-4 border-2 border-dashed border-gray-300 rounded-lg  hover:bg-gray-50 transition duration-200">
              <label htmlFor="file-upload" className="flex items-center space-x-2 text-gray-500">
                {/* <HiCloudUpload className="text-2xl" /> */}
                <span className="text-lg cursor-pointer">Click to upload</span>
              </label>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden "
              />
            </div>
          </FormControl>
          <FormMessage>{errors.images?.message}</FormMessage>
        </FormItem>

        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {previewImages.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`Preview ${index}`}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        <Button type="submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Submit'}
        </Button>
      </form>

      {uploadedUrls.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Uploaded Images</h3>
          <ul className="list-disc pl-4">
            {uploadedUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Form>
  );
}
