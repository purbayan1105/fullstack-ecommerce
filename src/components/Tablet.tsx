"use client";

import { getProducts } from "@/services/addProductServ";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Slider from "react-slick";

export type TabletsProps = {
  _id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  imageUrls: string[];
};

const Tablet = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tablet-fetching"],
    queryFn: async () => {
      const response = await getProducts();
      const result = response.data;
      const onlyTablets = result.filter((items: TabletsProps) => {
        return items.category === "tablets";
      });

      return onlyTablets;
    },
  });

  const imageSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplaySpeed: 2000,
    arrows: false,
    autoplay: true,
  };
  return (
    <>
      <div className=" lg:h-[80dvh] h-auto grid grid-cols-1 lg:grid-cols-3 justify-around items-center px-8 lg:px-10 py-8">
        <div className="lg:col-span-2 lg:pr-48">
          <div className="">
            <p className="font-bold text-6xl text-gray-400">All New</p>
            <p className="font-bold text-6xl text-gray-950">
              Tablets and iPads
            </p>
          </div>
          <div className="font-thin text-3xl mt-8">
            Slick and portable in designs, easy to carry, high-end technolgies
            supported
          </div>
          <div className="mt-8 space-x-5">
            <button className="bg-black rounded-full px-4 py-3 text-xl text-white font-semibold">
              Buy Now
            </button>

            <Link href="/category/tablets">
              <button className="border-2 border-solid border-black px-4 py-3 rounded-full">
                See More
              </button>
            </Link>
            <button></button>
          </div>
        </div>
        <div className=" flex flex-col justify-end mt-6 lg:mt-0">
          {data?.map((items: TabletsProps) => {
            return (
              <div className="" key={items._id}>
                <Slider {...imageSettings}>
                  {items.imageUrls.map((imageUrl: any, index: number) => {
                    return (
                      <Image
                        src={imageUrl}
                        alt=""
                        height={250}
                        width={250}
                        key={index}
                        className="max-w-[300px] max-h-[300px] object-contain"
                      />
                    );
                  })}
                </Slider>
                <Link href={`/allproducts/${items._id}`}>
                  <div className="space-y-3">
                    <div className="text-2xl font-semibold mt-5">
                      {items.title}
                    </div>
                    <div className="text 3xl font-semibold">
                      {items.price} Rs.
                    </div>
                    <div className="">
                      {items.description.length > 50 ? (
                        <>
                          {items.description.slice(0, 70)}{" "}
                          <span className="font-semibold"> know more...</span>
                        </>
                      ) : (
                        items.description
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Tablet;
