"use client";

import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import HeadPhones from "@/components/HeadPhones";
import Macboook from "@/components/Macbook";
import Tablet from "@/components/Tablet";

import Trending from "@/components/TrendingPhonese";
import { getProducts } from "@/services/addProductServ";
import { productAtom } from "@/utils/atoms";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const page = () => {
  const [allProducts, setAllProducts] = useAtom(productAtom);
  const { data, isLoading, isFetching, isFetched, isSuccess } = useQuery({
    queryKey: ["product-data-fetching"],
    queryFn: async () => {
      const response = await getProducts();
      // console.log("all products", response);

      return response;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return (
      <div className="h-[70dvh] flex justify-center items-center animate-pulse flex-col ">
        <p className="lg:text-6xl text-3xl text-gray-600 font-semibold text-center">
          Welcome To
        </p>
        <p className="poppins lg:text-8xl text-5xl font-bold text-center">
          Gadget's World
        </p>
      </div>
    );
  }

  if (data && isFetched && isSuccess) {
    setAllProducts(data.data);
  }

  return (
    <>
      <Banner />
      <Trending />
      <Macboook />
      <HeadPhones />
      <Tablet />
    </>
  );
};

export default page;
