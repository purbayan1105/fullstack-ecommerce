"use client";
import Tablet, { TabletsProps } from "@/components/Tablet";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

import Heart from "@/components/Heart";
import { getProducts } from "@/services/addProductServ";
import AddToCartHandle from "@/components/AddtoCartHandle";
import { Spinner } from "@nextui-org/react";
import BuyNow from "@/components/BuyNow";

const page = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-laptops-category"],
    queryFn: async () => {
      let allProducts = await getProducts();
      allProducts = allProducts.data;
      const onlylaptops = allProducts.filter((items: TabletsProps) => {
        return items.category === "laptops";
      });
      return onlylaptops;
    },
  });
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen">
        <h1 className="flex justify-center items-center text-center text-4xl font-semibold capriola h-[20dvh]">
          Trending laptops
        </h1>
        <div className=" grid lg:space-x-5 lg:grid-cols-4 px-8 lg:px-10 py-6">
          {data.map((laptop: TabletsProps) => {
            return (
              <div
                className="bg-gray-100 shadow-md rounded-lg px-3 py-3 relative"
                key={laptop._id}>
                <Image
                  src={laptop.imageUrls[0]}
                  alt=""
                  width={300}
                  height={300}
                />
                <div className="space-y-5 mt-5">
                  <Link href={`/allproducts/${laptop._id}`}>
                    <h2 className="text-lg font-semibold">{laptop.title}</h2>
                    <p>{laptop.price}</p>
                    <p>
                      {laptop.description.length > 50 ? (
                        <>
                          {laptop.description.slice(0, 50)}
                          <span className="font-semibold">Know More...</span>
                        </>
                      ) : (
                        <>{laptop.description}</>
                      )}
                    </p>
                  </Link>
                  <div className="space-y-3">
                    <AddToCartHandle product={laptop} />

                    <BuyNow productId={laptop._id} />
                  </div>
                </div>
                <div className="absolute z-10 right-2 top-1">
                  <Heart product={laptop} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
