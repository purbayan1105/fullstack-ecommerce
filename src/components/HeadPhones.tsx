"use client";

import { useEffect, useMemo, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getProducts } from "@/services/addProductServ";
import { useAtom } from "jotai";
import { productAtom } from "@/utils/atoms";
import { ProductProps } from "@/utils/ProductType";

type HeadPhoneProps = {
  title: string;
  category: string;
  description: string;
  price: string;
  imageUrls: string[];
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerPadding: "100px",

  autoplaySpeed: 2000,
  arrows: false,
};

const HeadPhones = () => {
  const [allProducts, setAllProducts] = useAtom(productAtom);

  const onlyHeadphones = allProducts?.filter(
    (items: ProductProps) => items.category === "headphones"
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "100px",

    autoplaySpeed: 2000,
    autoplay: true,
    arrows: false,
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center px-10 h-auto lg:h-[80dvh] bg-gradient-to-br from-green-50 via-pink-50 to-blue-50 py-10">
        <Slider {...settings} className="">
          {onlyHeadphones.map((headphones: ProductProps) => {
            return (
              <div className="space-y-3" key={headphones._id}>
                <Image
                  src={headphones.imageUrls[0]}
                  alt=""
                  width={300}
                  height={400}
                  className=" lg:h-[300px] flex justify-center items-center"
                />
                <Link href={`/allproducts/${headphones._id}`}>
                  <div className="text-lg font-semibold">
                    {headphones.title}
                  </div>
                  <div className="flex items-center">
                    <p>{headphones.price} </p>
                    <FaRupeeSign />
                  </div>
                  <div className="">
                    {headphones.description.length > 50 ? (
                      <>
                        {headphones.description.slice(0, 50)}{" "}
                        <span className="font-semibold"> Know More...</span>
                      </>
                    ) : (
                      headphones.description
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>

        <div className="mt-8 lg:mt-0">
          <div className="text-5xl lg:text-6xl font-semibold text-gray-400">
            Stereo
          </div>
          <div className="text-5xl lg:text-6xl font-semibold ">
            Headphones & Speakers
          </div>
          <div className="mt-8 text-3xl font-thin">
            Immerse yourself in pure sound, from personal escapes to
            room-filling beats...
          </div>

          <div className="space-x-5 mt-8">
            <Link href="/category/headphones">
              {" "}
              <button className="bg-black text-white px-4 py-3 rounded-full text-xl">
                See All
              </button>
            </Link>

            <button className="border-2 border-black border-solid px-4 py-3 rounded-full">
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadPhones;
