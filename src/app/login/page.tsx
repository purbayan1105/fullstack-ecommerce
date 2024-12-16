"use client";

import React, { useState } from "react";
import loginSvg from "../../../public/login.svg";
import Image from "next/image";
import Link from "next/link";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { userloginService } from "@/services/userServ";

const page = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const loginHandle = async () => {
    console.log(loginData);
    try {
      const response = await userloginService(loginData);
      console.log(response.message);

      toast.success(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[90dvh] space-y-5">
        <div className="text-blue-900 text-4xl font-semibold">User Login</div>
        <Image src={loginSvg} alt="login-svg" height={100} width={100} />
        <input
          type="email"
          name=""
          id=""
          className="bg-blue-100 px-3 py-4 rounded-lg lg:w-[300px]"
          placeholder="Enter your registerd email"
          onChange={(e: any) => {
            setLoginData({ ...loginData, email: e.target.value });
          }}
        />
        <input
          type="password"
          name=""
          id=""
          className="bg-blue-100 rounded-lg  px-3 py-4 lg:w-[300px]"
          placeholder="Enter your password"
          onChange={(e: any) => {
            setLoginData({ ...loginData, password: e.target.value });
          }}
        />
        <button
          className="bg-indigo-800 px-4 py-2 rounded-lg text-slate-100 lg:w-[300px] lg:text-xl lg:font-semibold"
          onClick={loginHandle}>
          Sign In
        </button>
        <div className="text-blue-500 font-semibold">
          {" "}
          <Link href="/forgotpassword"> Forgot Password</Link>{" "}
        </div>
        <div className="">
          Did not have account?{" "}
          <Link href="/usersignup">
            {" "}
            <span className="text-blue-500 font-semibold">Sign Up</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
