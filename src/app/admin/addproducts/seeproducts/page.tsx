"use client";

import { getProducts } from "@/services/addProductServ";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [seeAllProducts, setSeeAllProducts] = useState([]);

  useEffect(() => {
    const seeProducts = async () => {
      const response = await getProducts();
      const result = response.data;

      setSeeAllProducts(result);
    };
    seeProducts();
  }, []);

  useEffect(() => {
    console.log(seeAllProducts);
  }, [seeAllProducts]);

  return (
    <>
      <div className="flex justify-center text-3xl font-bold mt-5">
        Product List
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border border-black">
          <thead className="bg-gray-100">
            <tr className="border border-black">
              <th className="border border-black p-2">ID</th>
              <th className="border border-black p-2">Title</th>
              <th className="border border-black p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {seeAllProducts.map((product: any) => (
              <tr key={product.sku} className="border border-black">
                <td className="border border-black p-2 flex items-center justify-between">
                  <p className="border-none">{product.sku}</p>
                  <Link
                    href={`/admin/addproducts/seeproducts/editproduct/${product.sku}`}>
                    {" "}
                    <p className="text-blue-600">Edit</p>
                  </Link>
                </td>
                <td className="border border-black p-2 text-center">
                  {product.title}
                </td>
                <td className="border border-black p-2 text-center">
                  {product.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
