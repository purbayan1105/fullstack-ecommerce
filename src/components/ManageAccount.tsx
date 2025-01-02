import UserContext from "@/context/userContext";
import { logoutUser } from "@/services/userServ";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export type ManageAccountProps = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const ManageAccount = ({ toggle, setToggle }: ManageAccountProps) => {
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

  const toggleDivHandle = (route: any) => {
    router.push(route);
    setToggle(false);
  };
  return (
    <>
      <div className="w-[200px] space-y-4">
        <div className="">
          <div
            className="hover:bg-green-500 hover:text-white px-3 rounded-md"
            onClick={() =>
              toggleDivHandle(`/${context.user.data.email}/your-orders`)
            }>
            Your Orders
          </div>

          <div
            className="hover:bg-green-500 hover:text-white px-3 rounded-md"
            onClick={() =>
              toggleDivHandle(`/manageaccount/${context?.user?.data?.email}`)
            }>
            Manage
          </div>
        </div>
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
