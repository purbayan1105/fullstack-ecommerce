"use client";
import React, { useState } from "react";
import usersignup from "../../../public/usersignup.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { useRouter } from "next/navigation";
import { userSignup } from "@/services/userServ";
import { FormType, ZodSchema } from "@/utils/zodSchema";
import { FaFileUpload } from "react-icons/fa";
import FileUploadComp from "@/components/FileUploadComp";

const Page = () => {
  const [profile, setProfile] = useState<File | null>(null);

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(ZodSchema), // Use zodResolver for validation
  });

  const onSubmit = async (signupData: FormType) => {
    // Handle successful submission

    console.log("button clicked");

    console.log(signupData);
    if (!profile) {
      toast.error("Please upload a profile image!");
      return;
    }
    console.log(profile);
    const formData = new FormData();
    formData.append("file", profile);
    formData.append("upload_preset", "dummy_preset");
    const uploadResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/doe3ftnti/image/upload",
      formData
    ); //Get the key from the dpocumentation of cloudinary (Api Reference)
    const uploadedImageData = uploadResponse.data;

    // console.log(uploadedImageData.secure_url);

    try {
      const result = await userSignup({
        ...signupData,
        imageUrl: uploadedImageData.secure_url,
      });
      toast.success(result.message);
      router.push(`/usersignup/verify/${signupData.email}`);
    } catch (error: any) {
      console.log("error at user signup page", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="py-6">
        <div className="flex flex-col justify-center items-center h-screen space-y-5 ">
          <div className="text-3xl font-semibold">
            User
            <span className="text-blue-800"> Sign Up</span> Form
          </div>
          <Image src={usersignup} width={100} height={100} alt="usersignup" />

          <input
            type="text"
            placeholder="Enter your first name"
            className={` ${
              isValid ? "bg-green-300" : "bg-blue-100"
            } px-3 py-4 rounded-lg ${
              errors.password ? "bg-red-100" : "bg-blue-100"
            } w-[300px] lg:w-[400px]`}
            {...register("firstName")}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}

          <input
            type="text"
            placeholder="Enter your last name"
            className={` ${
              isValid ? "bg-green-300" : "bg-blue-100"
            } px-3 py-4 rounded-lg ${
              errors.password ? "bg-red-100" : "bg-blue-100"
            }  w-[300px] lg:w-[400px]`}
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}

          <input
            type="email"
            placeholder="Enter you email"
            className={` ${
              isValid ? "bg-green-300" : ""
            } px-3 py-4 rounded-lg bg-blue-100 ${
              errors.password ? "bg-red-100" : ""
            }  w-[300px] lg:w-[400px]`}
            {...register("email")}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.email?.message}</span>
          )}

          <input
            type="password"
            placeholder="Enter your password"
            className={` ${
              isValid ? "bg-green-300" : ""
            } px-3 py-4 rounded-lg bg-blue-100 ${
              errors.password ? "bg-red-100" : ""
            } w-[300px] lg:w-[400px] `}
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <input
            type="password"
            placeholder="Confirm your password"
            className={` ${
              isValid ? "bg-green-300" : ""
            } px-3 py-4 bg-blue-100 rounded-lg ${
              errors.password ? "bg-red-100" : ""
            }  w-[300px] lg:w-[400px]`}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
          {/* <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="bg-blue-100 px-3 py-4 rounded-lg  w-[300px] lg:w-[400px] "
              onChange={(e: any) => setProfile(e.target.files?.[0])}
            />
            <FaFileUpload size={30} className="absolute z-10 right-10 top-3" />
          </div> */}

          <FileUploadComp profile={profile} setProfile={setProfile} />
          <button
            className="bg-indigo-700 text-slate-100 px-3 py-2 rounded-lg font-semibold w-[300px] lg:w-[400px]"
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Page;
