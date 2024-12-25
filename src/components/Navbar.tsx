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

const Navabar = () => {
  const [toggle, setToggle] = useState(false);

  const [dropdowns, setDropdowns] = useState({
    favdropdown: false,
    cartdropdown: false,
    accoutdropdown: false,
  });

  const context = useContext(UserContext) as any;

  const toggleRef = useRef<HTMLDivElement>(null);

  const toggleHandle = () => {
    setToggle(!toggle);
  };

  const toggleDropDown = (dropdown: any) => {
    setDropdowns((prevState: any) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setToggle(false);

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 lg:grid-cols-3 items-center gap-5 justify-end pr-8 pl-6 bg-gradient-to-br from-indigo-700 via-indigo-400 to-indigo-800 h-20">
        <div className="text-lg lg:text-3xl font-semibold capriola text-slate-900 col-span-2 lg:col-span-1">
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
            {dropdowns.favdropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          <Link href={`/${context?.user?.data.email}/cart`}>
            <div
              className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-lg cursor-pointer select-none"
              onClick={() => {
                toggleDropDown("cartdropdown");
              }}>
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
                src={context.user.data.imageUrl}
                alt=""
                className="w-8 rounded-full h-8"
              />
            )}
            {context?.user ? (
              <p>{context.user.data.firstName}</p>
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
              <div className="absolute bg-slate-200 top-10 right-5 rounded-lg px-3 py-3">
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
        <div
          ref={toggleRef}
          className="space-y-8 text-xl absolute z-20 top-20 bg-gray-100 w-full px-6 py-6">
          <SearchBar />

          <div className="space-y-5">
            <Link href="/category/phones">
              <div className="py-2 hover:bg-slate-400 rounded-md pl-2 font-semibold">
                Mobiles
              </div>
            </Link>
            <Link href="/category/laptops">
              <div className="py-2 hover:bg-slate-400 rounded-md pl-2 font-semibold">
                Laptops
              </div>
            </Link>
            <Link href="/category/tablets">
              <div className="py-2 hover:bg-slate-400 rounded-md pl-2 font-semibold">
                Tablets
              </div>
            </Link>
            <Link href="/category/headphones">
              <div className="py-2 hover:bg-slate-400 rounded-md pl-2 font-semibold">
                Headphones
              </div>
            </Link>
            <Link href="/contact">
              <div className="py-2 hover:bg-slate-400 rounded-md pl-2 font-semibold">
                contact
              </div>
            </Link>
          </div>

          <Link href="/favourites">
            <div className="flex items-center gap-2  rounded-lg  cursor-pointer pt-5 pb-3">
              <CiHeart size={25} color="red" stroke="red" />
              <p>
                <span className="select-none">Favourites</span>
              </p>
            </div>
          </Link>
          <Link href={`/${context?.user?.data.email}/cart`}>
            <div className="flex items-center gap-2 cursor-pointer rounded-lg">
              <CiShoppingCart size={25} color="green" />
              <p>
                <span className="select-none">Cart</span>
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2 bg-gray-800 w-fit  px-4 py-2 rounded-lg cursor-pointer">
            {" "}
            {context.user && (
              <img
                src={context.user.data.imageUrl}
                alt=""
                className="w-8 rounded-full h-8"
              />
            )}
            {context?.user ? (
              <p className="text-white select-none">
                {context.user.data.firstName}
              </p>
            ) : (
              <Link href="/login">
                {" "}
                <p className="text-white select-none">Log in</p>
              </Link>
            )}
            {context.user ? <IoIosArrowDown color="white" /> : ""}
          </div>
        </div>
      )}
    </>
  );
};

export default Navabar;
