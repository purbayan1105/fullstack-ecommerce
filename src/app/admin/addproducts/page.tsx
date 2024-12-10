"use client";

import { adminLogoutService } from "@/services/adminloginServ";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const logoutHandle = async () => {
    try {
      const response = await adminLogoutService();

      console.log(response);

      toast.success(response.message);
      router.push("/");
    } catch (error: any) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex justify-end mx-16 my-5">
        <button
          className="bg-blue-700 text-md text-white px-3 py-2 rounded-lg"
          onClick={logoutHandle}>
          Admin Logout
        </button>
      </div>
    </>
  );
};

export default page;
