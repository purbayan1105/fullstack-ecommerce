"use client";

import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";

import { getProducts } from "@/services/addProductServ";
import AddToCartHandle from "./AddtoCartHandle";
import Heart from "./Heart";

const Trending = () => {
  const [trendingPhones, setTrendingPhones] = useState([]);
  useEffect(() => {
    async function getTrendingPhones() {
      let allProducts = await getProducts();

      allProducts = allProducts.data;

      const onlyPhones = allProducts.filter((product: any) => {
        return product.category === "phones";
      });
      console.log(onlyPhones);
      setTrendingPhones(onlyPhones);
    }

    getTrendingPhones();
  }, []);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: "100px",

    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 0,
          slidesToScroll: 0,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="h-auto bg-gradient-to-tr from-gray-100 via-pink-100 to-blue-100 py-10 px-5 relative">
      <div className="text-center font-semibold text-black text-6xl my-5 lg:my-8">
        Trending Phones
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:space-x-5 space-y-5 lg:space-y-0">
        {trendingPhones.map((phone: any, index: number) => (
          <div
            key={index}
            className="bg-white px-3 py-3 rounded-lglg:w-auto h-auto space-y-8 shadow-lg rounded-md relative">
            <div className="h-[50%] my-3">
              <Slider {...imageSettings}>
                {phone.imageUrls.map((imageUrl: any, index: number) => (
                  <Image
                    src={imageUrl}
                    alt=""
                    width={300}
                    height={400}
                    key={index}
                    className="w-[250px] h-[300px] flex mx-auto"
                  />
                ))}
              </Slider>
            </div>
            <hr />
            <Link href={`/allproducts/${phone._id}`}>
              <div className="text-xl font-semibold mt-5">{phone.title}</div>

              <div className="text-lg font-normal mt-5">{phone.price} Rs.</div>
              <div className="flex-grow min-h-[80px]">
                {phone.description.length > 0 ? (
                  <>
                    {phone.description.slice(0, 100)}
                    <span className="font-semibold"> know more...</span>
                  </>
                ) : (
                  phone.description
                )}
              </div>
            </Link>{" "}
            <div className="mt-auto flex items-center">
              <AddToCartHandle product={phone} />
            </div>
            <div className="absolute z-10 right-1 top-1">
              <Heart product={phone} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
