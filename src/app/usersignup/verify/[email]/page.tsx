"use client";

import { verifyUser } from "@/services/userServ";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
const page = () => {
  const params = useParams();
  const [verifyOTP, setVerifyOTP] = useState("");
  const { email } = params;
  const decodedEmail = decodeURIComponent(email as string);
  const router = useRouter();
  const verifyOTPHandle = async () => {
    console.log(verifyOTP);
    try {
      const response = await verifyUser({
        email: decodedEmail,
        verificationCode: verifyOTP,
      });
      toast.success(response.message);
      router.push("/");
    } catch (error: any) {
      console.log("error at verify otp page", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen space-y-6">
        <div className="text-2xl font-semibold text-indigo-800">
          Verify your email-{decodedEmail}
        </div>
        <input
          type="text"
          name=""
          id=""
          className="bg-blue-100 px-3 py-4 rounded-lg"
          placeholder="Enter your email"
          onChange={(e: any) => setVerifyOTP(e.target.value)}
        />
        <button
          className="bg-blue-900 text-slate-100 px-3 py-2 rounded-lg"
          onClick={verifyOTPHandle}>
          Verify OTP
        </button>
      </div>
    </>
  );
};

export default page;
