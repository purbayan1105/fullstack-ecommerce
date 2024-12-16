import UserContext from "@/context/userContext";
import { logoutUser } from "@/services/userServ";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const ManageAccount = () => {
  const context = useContext(UserContext) as any;
  const router = useRouter();
  const logoutBtnHandle = async () => {
    try {
      const result = await logoutUser();
      toast.success("Log out successful");
      window.location.reload();
      router.push("/");
    } catch (error) {
      console.log("error at manage accounts page", error);
    }
  };
  return (
    <>
      <div className="w-[200px] space-y-4 ">
        <Link href={`/${context.user.data.email}/your-orders`}>
          <div className="hover:bg-green-500 hover:text-white px-3 rounded-md">
            Your Orders
          </div>
        </Link>
        <Link href={`/manageaccount/${context?.user?.data?.email}`}>
          {" "}
          <div className="hover:bg-green-500 hover:text-white px-3 rounded-md">
            Manage
          </div>
        </Link>
        <button
          className="bg-blue-500 hover:bg-green-500 hover:text-white px-3 rounded-md w-full"
          onClick={logoutBtnHandle}>
          Logout
        </button>
      </div>
    </>
  );
};

export default ManageAccount;
