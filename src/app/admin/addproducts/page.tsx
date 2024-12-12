"use client";

import { adminLogoutService } from "@/services/adminloginServ";
import axios from "axios";
import productSVG from "../../../../public/products.svg";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { addproductService } from "@/services/addProductServ";

const page = () => {
  const router = useRouter();

  const [characterLimit, setCharacterLimit] = useState<number>(150);
  const logoutHandle = async () => {
    try {
      const response = await adminLogoutService();

      console.log(response);

      toast.success(response.message);
      router.push("/");
    } catch (error: any) {
      console.log(error);

      toast.error(error.response.data.message);
    }
  };

  // Related to the add product form

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    sku: "",
    price: "",
    stocks: "",
    image1: null,
    image2: null,
    image3: null,
  });

  const productFormHandle = async (e: any) => {
    e.preventDefault();

    let imageUrls: string[] = [];
    const images: any = [
      productData.image1,
      productData.image2,
      productData.image3,
    ];
    for (const image of images) {
      const productImageData = new FormData();
      productImageData.append("file", image);
      productImageData.append("upload_preset", "dummy_preset");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/doe3ftnti/image/upload",
        productImageData
      );

      const result = response.data;
      console.log(result.secure_url);
      imageUrls.push(result.secure_url);
      console.log(imageUrls);
    }

    const updatedData = { ...productData, imageUrls };

    try {
      const result = await addproductService(updatedData);
      toast.success("Product Added");
    } catch (error: any) {
      console.log("error at add product page", error.response.data.message);
      toast.error(error.message);
    }

    console.log(productData);
  };

  return (
    <>
      <div className="flex justify-end mx-16 my-5">
        <button
          className="bg-blue-700 text-md text-white px-3 py-2 rounded-lg"
          onClick={logoutHandle}>
          Admin Logout
        </button>
      </div>

      {/* product add form */}
      <form onSubmit={productFormHandle}>
        <div className="flex flex-col justify-center items-center lg:h-auto space-y-5 px-5 py-5">
          <div className="text-3xl font-semibold text-indigo-600 poppins pt-5">
            Add all new products here!
          </div>
          <Image src={productSVG} alt="product-svg" className="w-[150px]" />
          <input
            type="text"
            name=""
            id=""
            placeholder="Write the Title Here..."
            className="bg-blue-100 px-3 py-4 rounded-lg lg:w-[300px]"
            onChange={(e: any) => {
              setProductData({ ...productData, title: e.target.value });
            }}
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="SKU Code here"
            className="bg-blue-100 px-3 py-4 rounded-lg lg:w-[300px]"
            onChange={(e: any) => {
              setProductData({ ...productData, sku: e.target.value });
            }}
          />
          <div className="bg-blue-100 px-3 py-4 rounded-lg lg:w-[300px] relative flex items-center">
            <input
              type="text"
              name=""
              id=""
              placeholder="Price of the product"
              className="w-full h-full bg-blue-100 outline-none"
              onChange={(e: any) =>
                setProductData({ ...productData, price: e.target.value })
              }
            />
            <div className="absolute z-10 right-3 ">
              <FaIndianRupeeSign />
            </div>
          </div>

          <div className="bg-blue-100 px-4 py-4 w-[250px] rounded-lg lg:w-[300px] relative">
            <textarea
              name=""
              id=""
              placeholder="Write description here..."
              className="w-full h-full bg-blue-100 outline-none border-none"
              onChange={(e: any) => {
                setProductData({ ...productData, description: e.target.value });
                setCharacterLimit(10 - productData.description.length);
              }}></textarea>
            <div className="absolute right-8 bottom-2 text-sm text-gray-400">
              {characterLimit >= 0 ? (
                <p>character limit -{characterLimit}</p>
              ) : (
                <p className="text-red-500">Limit exceeded</p>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center space-x-5 w-[300px]">
            <input
              type="number"
              name=""
              id=""
              placeholder="Add stocks"
              className="bg-blue-100 px-3 py-4 rounded-lg w-[40%]"
              onChange={(e: any) =>
                setProductData({ ...productData, stocks: e.target.value })
              }
            />

            <select
              name=""
              id=""
              defaultValue=""
              className="bg-blue-100 px-4 py-4 rounded-lg w-[40%]"
              onChange={(e: any) =>
                setProductData({ ...productData, category: e.target.value })
              }>
              <option value="" disabled>
                Category
              </option>
              <option value="phones">Phones</option>
              <option value="accessories">Accessories</option>
              <option value="laptops">Laptops</option>
              <option value="speakers">Speakers</option>
              <option value="tablets">Tablets</option>
              <option value="headphones">Headphones</option>
            </select>
          </div>
          <input
            type="file"
            accept="image/*"
            name=""
            id=""
            placeholder="Add Primary Image"
            onChange={(e: any) => {
              setProductData({ ...productData, image1: e.target.files[0] });
            }}
          />
          <input
            type="file"
            name=""
            accept="image/*"
            id=""
            placeholder="Add secondary image"
            onChange={(e: any) => {
              setProductData({ ...productData, image2: e.target.files[0] });
            }}
          />
          <input
            type="file"
            name=""
            accept="image/*"
            id=""
            placeholder="Add secondary image"
            onChange={(e: any) => {
              setProductData({ ...productData, image3: e.target.files[0] });
            }}
          />

          <button
            className={`bg-blue-600 text-white px-3 py-2 rounded-lg  ${
              characterLimit >= 0 ? "" : "cursor-not-allowed opacity-45"
            }`}
            type="submit">
            Add Products
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
