"use client";

import React, { useState } from "react";
import adminLogo from "../../../public/admin.svg";
import Image from "next/image";
import { adminLoginService } from "@/services/adminloginServ";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const page = () => {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const adminHandleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log(adminData);
      const result = await adminLoginService(adminData);
      toast.success("login successful");
      router.push("/admin/addproducts");
    } catch (error: any) {
      console.log("error at adminloginpage", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <form action="" onSubmit={adminHandleSubmit}>
        <div className="flex flex-col justify-center items-center h-[90dvh] space-y-5">
          <div className="text-indigo-800 text-3xl font-semibold">
            Admin Login Here
          </div>
          <Image src={adminLogo} width={100} height={100} alt="admin-logo" />
          <input
            type="text"
            className="bg-blue-100 px-3 py-4 rounded-lg"
            placeholder="Enter your Email "
            onChange={(e: any) =>
              setAdminData({ ...adminData, email: e.target.value })
            }
          />
          <input
            type="password"
            className="bg-blue-100 px-3 py-4 rounded-lg"
            placeholder="Enter your Password "
            onChange={(e: any) =>
              setAdminData({ ...adminData, password: e.target.value })
            }
          />
          <button
            className="bg-indigo-800 px-3 py-2 rounded-lg font-semibold text-slate-200"
            type="submit">
            Login Here
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
