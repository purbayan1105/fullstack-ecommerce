"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaRupeeSign } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Spinner } from "@nextui-org/react";
import { useContext } from "react";
import UserContext from "@/context/userContext";

import { getProducts } from "@/services/addProductServ";
import { addToCartFn } from "@/services/userServ";
import { useRouter } from "next/navigation";

type ProductProps = {
  _id: string;
  title: string;
  description: string;
  imageUrls: string[];
  price: string;
  stocks: string;
  sku: string;
};

type ContextProps = {
  user: {
    data: {
      _id: string;
      email: string;
    };
  };
};

const page = () => {
  const params = useParams();

  const router = useRouter();
  const { id } = params;
  const context = useContext(UserContext) as ContextProps;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-products", id],
    queryFn: async () => {
      let allProducts = await getProducts();
      allProducts = allProducts.data;

      const foundProduct = allProducts.find(
        (item: ProductProps) => item._id === id
      );
      return foundProduct;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="min-h-screen">
        {" "}
        <Spinner
          className="flex justify-center items-center h-[60dvh]"
          size="lg"
        />
      </div>
    );
  if (isError || !data) return <div>Product not found</div>;

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

  const addToCartHandler = async (key: any) => {
    console.log("clicked");

    const email = context.user?.data?.email;

    console.log(data._id);

    if (email && data) {
      const product = data;
      const result = await addToCartFn({
        email,
        product,
      });

      console.log(result);
    } else {
      router.push("/login");
    }
  };

  // Buy handler

  const buyItemHandle = (id: any) => {
    router.push(`${id}/buy-item`);
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-10 px-8 space-x-5 mt-5 min-h-screen">
        <div className="col-span-1 bg-gray-100 h-[60dvh]">
          <Slider {...imageSettings}>
            {data.imageUrls.map((imageUrl: string, index: number) => {
              return (
                <Image
                  src={imageUrl}
                  alt=""
                  height={400}
                  width={400}
                  key={index}
                  className="w-full object-contain h-[400px]"
                />
              );
            })}
          </Slider>
        </div>
        <div className="space-y-10 lg:mt-0 mt-8">
          <div className="text-3xl capriola">{data.title}</div>
          <div className="text-xl flex items-center">
            <p>{data.price}</p>
            <FaRupeeSign />
          </div>
          <div className="text-xl font-normal">{data.description}</div>
          <div className="space-x-5">
            <button
              className="bg-black text-white text-xl px-4 py-3 rounded-lg"
              onClick={() => buyItemHandle(data._id)}>
              Buy Now
            </button>
            <button
              className="border-2 border-solid border-black rounded-lg px-4 py-3"
              onClick={() => addToCartHandler(data._id)}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10 text-2xl font-semibold">
        Recent Reviews
      </div>
    </>
  );
};

export default page;
