"use client";
import { TabletsProps } from "@/components/Tablet";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import AddToCartHandle from "@/components/AddtoCartHandle";
import { getProducts } from "@/services/addProductServ";
import { Spinner } from "@nextui-org/react";

const page = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-phones-category"],
    queryFn: async () => {
      let allProducts = await getProducts();
      allProducts = allProducts.data;
      const onlyPhones = allProducts.filter((items: TabletsProps) => {
        return items.category === "phones";
      });
      return onlyPhones;
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
          Trending Phones
        </h1>
        <div className=" grid lg:space-x-5 lg:grid-flow-col px-8 lg:px-10 py-6">
          {data.map((phone: TabletsProps) => {
            return (
              <div
                className="bg-gray-100 shadow-md rounded-lg px-3 py-3"
                key={phone._id}>
                <Image
                  src={phone.imageUrls[0]}
                  alt=""
                  width={300}
                  height={300}
                  className="w-[300px] h-[330px]"
                />
                <div className="space-y-5 mt-5">
                  <Link href={`/allproducts/${phone._id}`}>
                    <h2 className="text-lg font-semibold">{phone.title}</h2>
                    <p>{phone.price}</p>
                    <p>
                      {phone.description.length > 50 ? (
                        <>
                          {phone.description.slice(0, 50)}
                          <span className="font-semibold">Know More...</span>
                        </>
                      ) : (
                        <>phones.description</>
                      )}
                    </p>
                  </Link>
                  <div className="space-y-3">
                    <AddToCartHandle product={phone} />
                    <button className="text-lg border-2 border-black border-solid text-whoite px-3 py-2 rounded-lg w-full ">
                      Buy Now
                    </button>
                  </div>
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
