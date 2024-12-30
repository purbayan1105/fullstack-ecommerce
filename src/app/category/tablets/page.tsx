"use client";
import { TabletsProps } from "@/components/Tablet";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Heart from "@/components/Heart";
import { getProducts } from "@/services/addProductServ";
import AddToCartHandle from "@/components/AddtoCartHandle";
import { Spinner } from "@nextui-org/react";
import BuyNow from "@/components/BuyNow";

const page = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-tablets-category"],
    queryFn: async () => {
      let allProducts = await getProducts();
      allProducts = allProducts.data;
      const onlyTablets = allProducts.filter((items: TabletsProps) => {
        return items.category === "tablets";
      });
      return onlyTablets;
    },
  });
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

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
      <div className="min-h-screen">
        <h1 className="flex justify-center items-center text-center text-4xl font-semibold capriola h-[20dvh]">
          Trending tablets
        </h1>
        <div className=" grid grid-cols-1 lg:space-x-5 lg:grid-cols-4 px-8 lg:px-10 py-6">
          {data.map((tablet: TabletsProps) => {
            return (
              <div
                className="bg-gray-100 shadow-md rounded-lg px-3 py-3 relative"
                key={tablet._id}>
                <Slider {...imageSettings}>
                  {tablet.imageUrls.map((imageUrl: string, index: number) => {
                    return (
                      <Image
                        src={imageUrl}
                        alt=""
                        key={index}
                        width={300}
                        height={250}
                        className="w-[300px] h-[330px]"
                      />
                    );
                  })}
                </Slider>

                <div className="space-y-5 mt-5">
                  <Link href={`/allproducts/${tablet._id}`}>
                    <h2 className="text-lg font-semibold">{tablet.title}</h2>
                    <p>{tablet.price}</p>
                    <p>
                      {tablet.description.length > 50 ? (
                        <>
                          {tablet.description.slice(0, 50)}
                          <span className="font-semibold">Know More...</span>
                        </>
                      ) : (
                        <>{tablet.description}</>
                      )}
                    </p>
                  </Link>
                  <div className="space-y-3">
                    <AddToCartHandle product={tablet} />

                    <BuyNow productId={tablet._id} />
                  </div>
                </div>
                <div className="absolute z-10 right-2 top-1">
                  <Heart product={tablet} />
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
