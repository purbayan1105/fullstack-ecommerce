"use client";

import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <>
      <div className="h-auto bg-gradient-to-tr from-gray-100 via-blue-50 to-gray-200 grid lg:grid-cols-2 px-10 py-5">
        <div className="flex flex-col justify-center items-start">
          <div className="text-6xl text-gray-300 font-semibold text-">
            The Brand New
          </div>
          <div className="text-6xl font-bold text-gray-800">
            Apple Iphone 15 Pro
          </div>
          <div
            className="py-5 font-normal text-gray-700
          ">
            Introducing the iPhone 15 Pro – where titanium design meets
            groundbreaking performance.
            <br />
            <span className="bg-orange-500 rounded-md px-1 py-1 text-white font-semibold">
              Powered by the A17 Pro chip{" "}
            </span>{" "}
            , experience unrivaled speed, a stunning 48MP Pro camera system, and
            immersive visuals on the Super Retina XDR display
          </div>
          <div className="flex justify-start items-center space-x-6 pt-6">
            <Link href="/allproducts/675b228a203285c6111e2a63">
              <button className="bg-blue-900 px-4 py-3 rounded-full text-2xl font-semibold text-white">
                Buy Now
              </button>
            </Link>
            <Link href="/allproducts/">
              {" "}
              <button className="border-2 border-solid border-black px-4 py-3 rounded-full  text-2xl font-normal">
                Shop All
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/bannerimg.png"
            alt="banner-img"
            className="lg:w-full lg:h-auto h-[360px]"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
