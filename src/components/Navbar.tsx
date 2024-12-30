"use client";
import UserContext from "@/context/userContext";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import ManageAccount from "./ManageAccount";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Navabar = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const router = useRouter();

  const [dropdowns, setDropdowns] = useState({
    favdropdown: false,
    cartdropdown: false,
    accoutdropdown: false,
  });

  const context = useContext(UserContext) as any;

  const toggleHandle = () => {
    setToggle(!toggle);
  };

  const toggleDropDown = (dropdown: any) => {
    setDropdowns((prevState: any) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const toggleDivOnClick = (route: string) => {
    router.push(route);
    setToggle(false);
  };

  return (
    <>
      <div className="grid grid-cols-4 lg:grid-cols-3 items-center gap-5 justify-end pr-8 pl-6 bg-gradient-to-br from-indigo-700 via-indigo-400 to-indigo-800 h-20">
        <div className="text-xl lg:text-4xl font-bold  capriola text-slate-900 col-span-2 lg:col-span-1 poppins">
          Gadget's World
        </div>
        <div className="flex items-center justify-center gap-3 lg:hidden">
          <Link href="/favourites">
            {" "}
            <FaHeart size={22} fill="red" />
          </Link>
          <Link href={`/${context?.user?.data?.email}/cart`}>
            <FaShoppingCart color="lightgreen" size={25} />
          </Link>
        </div>
        <div className="hidden lg:block">
          <SearchBar />
        </div>

        <div className="lg:flex justify-center items-center gap-5 hidden">
          <div
            className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-lg cursor-pointer select-none"
            onClick={() => {
              toggleDropDown("favdropdown");
            }}>
            <CiHeart size={25} color="red" />
            <Link href="/favourites">
              <p>Favourites</p>
            </Link>
          </div>
          <Link href={`/${context?.user?.data?.email}/cart`}>
            <div className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-lg cursor-pointer select-none">
              <CiShoppingCart size={25} color="green" />
              <p>Cart</p>
            </div>
          </Link>
          <div
            className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-lg cursor-pointer select-none relative"
            onClick={() => {
              toggleDropDown("accoutdropdown");
            }}>
            {context.user && (
              <img
                src={context?.user?.data?.imageUrl}
                alt=""
                className="w-8 rounded-full h-8"
              />
            )}
            {context?.user ? (
              <p>{context.user?.data?.firstName}</p>
            ) : (
              <Link href="/login">
                {" "}
                <p>Log in</p>
              </Link>
            )}
            {context.user ? (
              <div className="">
                {dropdowns.accoutdropdown ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </div>
            ) : (
              ""
            )}

            {dropdowns.accoutdropdown && context.user && (
              <div className="absolute bg-slate-200 top-14 right-0 rounded-lg px-3 py-3 animate-dropdown">
                <ManageAccount />
              </div>
            )}
          </div>
        </div>
        <div className="lg:hidden flex justify-end" onClick={toggleHandle}>
          {toggle ? (
            <RxCross2 size={25} className="outline-none rounded-md" />
          ) : (
            <FaBarsStaggered size={25} />
          )}
        </div>
      </div>

      {/* For Mobile */}
      {toggle && (
        <div className="space-y-8 text-xl absolute z-20 top-20 bg-gray-100 w-full px-6 py-6">
          <SearchBar />

          <div className="space-y-5">
            <div
              className="py-2 hover:bg-slate-400 rounded-md pl-2 font-semibold"
              onClick={() => toggleDivOnClick("/")}>
              Home
            </div>

            <div
              className="py-2 hover:bg-slate-400 rounded-md pl-2 font-semibold"
              onClick={() => toggleDivOnClick("/category/phones")}>
              Mobiles
            </div>

            <div
              className="py-2 hover:bg-slate-400 rounded-md pl-2 font-semibold"
              onClick={() => toggleDivOnClick("/category/laptops")}>
              Laptops
            </div>

            <div
              className="py-2 hover:bg-slate-400 rounded-md pl-2 font-semibold"
              onClick={() => toggleDivOnClick("/category/tablets")}>
              Tablets
            </div>

            <div
              className="py-2 hover:bg-slate-400 rounded-md pl-2 font-semibold"
              onClick={() => toggleDivOnClick("/category/headphones")}>
              Headphones
            </div>

            <div
              className="py-2 hover:bg-slate-400 rounded-md pl-2 font-semibold"
              onClick={() => toggleDivOnClick("/contact")}>
              contact
            </div>
          </div>

          <div
            className="flex items-center gap-2  rounded-lg  cursor-pointer pt-5 pb-3"
            onClick={() => toggleDivOnClick("/favourites")}>
            <CiHeart size={25} color="red" stroke="red" />
            <p>
              <span className="select-none">Favourites</span>
            </p>
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer rounded-lg"
            onClick={() =>
              toggleDivOnClick(`/${context?.user?.data?.email}/cart`)
            }>
            <CiShoppingCart size={25} color="green" />
            <p>
              <span className="select-none">Cart</span>
            </p>
          </div>

          <div className="flex items-center gap-2 bg-gray-800 w-fit  px-4 py-2 rounded-lg cursor-pointer">
            {context.user ? (
              <button
                className="flex justify-center items-center h-12 text-white gap-3"
                onClick={() => {
                  toggleDropDown("accoutdropdown");
                }}>
                <Image
                  src={context.user.data.imageUrl}
                  alt="DP"
                  height={100}
                  width={100}
                  className="w-[3rem] h-[3rem] rounded-full"
                />
                <p>{context.user.data.firstName}</p>
                <div className="">
                  {dropdowns.accoutdropdown ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
              </button>
            ) : (
              <button
                className="flex justify-center items-center h-8 text-white gap-3 w-32"
                onClick={() => toggleDivOnClick("/login")}>
                Login
              </button>
            )}

            {dropdowns.accoutdropdown && context.user && (
              <div className="absolute bg-slate-200 bottom-[6rem] left-4 rounded-lg px-3 py-3 z-30 animate-dropdown">
                <ManageAccount />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navabar;
