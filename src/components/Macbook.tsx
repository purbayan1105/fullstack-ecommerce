// // "use client";

// // import Link from "next/link";

// // import { useQuery } from "@tanstack/react-query";
// // import { useEffect, useState } from "react";

// // import { Spinner } from "@nextui-org/react";
// // import Mac from "./Mac";
// // import { getProducts } from "@/services/addProductServ";

// // const Macboook = () => {
// //   const { data, isLoading, isError } = useQuery({
// //     queryKey: ["datafetching"],
// //     queryFn: async () => {
// //       const response = await getProducts();
// //       const result = response.data;
// //       const onlyMac = result.filter((items: any) => {
// //         return items.category === "laptops";
// //       });
// //       console.log("only mac", onlyMac);
// //       return onlyMac;
// //     },
// //   });

// //   if (isLoading) {
// //     return (
// //       <>
// //         <Spinner className="flex justify-center items-center" />
// //       </>
// //     );
// //   }

// //   return (
// //     <>
// //       <Mac data={data} />
// //     </>
// //   );
// // };

// // export default Macboook;

"use client";

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { Spinner } from "@nextui-org/react";
import Mac from "./Mac";
import { getProducts } from "@/services/addProductServ";
import { useAtom } from "jotai";
import { productAtom } from "@/utils/atoms";
import { ProductProps } from "@/utils/ProductType";

const Macboook = () => {
  const [allProducts, setAllProducts] = useAtom(productAtom);

  // console.log("allProducts", allProducts);

  if (!allProducts || allProducts.length === 0) {
    return <div>No laptops found</div>;
  }

  const onlyMac = allProducts?.filter(
    (product: ProductProps) => product.category === "laptops"
  );

  if (!onlyMac) {
    console.log("No laoptops found");
  }

  return (
    <>
      <Mac data={onlyMac} />
    </>
  );
};

export default Macboook;
