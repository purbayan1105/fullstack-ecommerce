import { productAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";

const Mac = ({ data }: any) => {
  return (
    <div>
      <div className="bg-gradient-to-tr from-gray-100 via-blue-100 to-slate-100 h-screen grid lg:grid-cols-2 items-center justify-center px-5 lg:px-10">
        <div className="">
          <div className="text-6xl font-semibold text-gray-400">All New</div>
          <div className="text-6xl font-semibold text-black">Macbook Pro</div>

          <div className="mt-8 text-3xl font-thin">
            Unleash Your Creativity with Power, Performance, and Portability
            Redefined!
          </div>
          <div className="space-x-5 mt-8">
            <Link href={`/allproducts/${data[0]._id}`}>
              <button className="bg-black text-white px-4 py-3 rounded-full text-xl">
                Shop Now
              </button>
            </Link>
            <Link href={`/allproducts/${data[0]._id}`}>
              <button className="border-2 border-black border-solid px-4 py-3 rounded-full">
                Know More
              </button>
            </Link>
          </div>
        </div>
        <Link href={`/allproducts/${data[0]._id}`}>
          <img src="/macimage.png" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Mac;
