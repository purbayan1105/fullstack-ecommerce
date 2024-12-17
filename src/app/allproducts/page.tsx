"use client";

import { Card, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getProducts } from "@/services/addProductServ";

const page = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      let allProducts = await getProducts();
      allProducts = allProducts.data;

      return allProducts;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Spinner
        className="flex justify-center items-center h-[60dvh]"
        size="lg"
      />
    );
  }

  if (isError) {
    return (
      <div className="text-xl flex justify-center items-center h-[70dvh]">
        Error at Loading Products
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
    <div className="grid lg:grid-cols-4 gap-6 px-8 lg:px-10 py-6">
      {data.map((products: any) => (
        <Card
          key={products._id}
          className="bg-gray-100 shadow-md rounded-lg px-3 py-3">
          <Slider {...imageSettings}>
            {products.imageUrls.map((imageUrl: string, index: number) => (
              <div key={index}>
                <Image
                  src={imageUrl}
                  alt="Product Image"
                  width={300}
                  height={300}
                  className="w-[300px] h-[330px]"
                />
              </div>
            ))}
          </Slider>

          <div className="space-y-5 mt-5">
            <Link href={`/allproducts/${products._id}`}>
              <h2 className="text-lg font-semibold mt-3">{products.title}</h2>
              <p className="mt-3">${products.price}</p>
              <p>
                {products.description.length > 50 ? (
                  <>
                    {products.description.slice(0, 50)}...
                    <span className="font-semibold"> Know More</span>
                  </>
                ) : (
                  <span className="font-semibold">{products.description}</span>
                )}
              </p>
            </Link>

            <div className="space-y-3">
              <button className="text-lg bg-gray-800 text-white px-3 py-2 rounded-lg w-full">
                Add To Cart
              </button>
              <button className="text-lg border-2 border-black text-black px-3 py-2 rounded-lg w-full">
                Buy Now
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default page;
