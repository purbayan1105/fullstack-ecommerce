"use client";

import { getProducts } from "@/services/addProductServ";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
  const router = useRouter();

  const [divisVisible, setdivIsVisbile] = useState(false);
  const [input, setInput] = useState("");

  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (input !== "") {
      setdivIsVisbile(true);
    } else {
      setdivIsVisbile(false);
    }
  }, [input]);

  const searchHandler = () => {
    console.log(input);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-products", input],
    queryFn: async () => {
      let allProducts = await getProducts();
      allProducts = allProducts.data;

      const searchedItem = allProducts.filter((product: any) =>
        product.title.toLowerCase().startsWith(input.toLowerCase())
      );

      return searchedItem;
    },
  });

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-6 items-center px-3 py-2 bg-indigo-50 rounded-lg">
          <input
            type="search"
            name=""
            id=""
            className="w-full outline-none bg-indigo-50 col-span-5"
            placeholder="Search your items..."
            onChange={onChangeHandler}
          />

          <div className="col-span-1  justify-center items-center flex">
            <IoSearchSharp size={25} color="blue" onClick={searchHandler} />
          </div>
        </div>

        {divisVisible && (
          <div className="absolute bg-[#ffffff] text-gray-700 w-[300px] h-auto py-3 px-3 rounded-lg mt-2 z-20 border-black border-2 border-solid ">
            {data && data.length > 0 ? (
              data?.map((item: any) => {
                return (
                  <div
                    className="py-2 cursor-pointer hover:bg-[#0000ffbe] hover:text-white hover:rounded-lg px-2"
                    key={item._id}>
                    <div
                      onClick={() => {
                        router.push(`/allproducts/${item._id}`);
                        setInput("");
                      }}>
                      {item.title}
                    </div>
                    {/* </Link> */}
                  </div>
                );
              })
            ) : (
              <>
                {" "}
                <div className="py-1 cursor-pointer  px-2">
                  No result found...
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
