import UserContext from "@/context/userContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ContextProps } from "./AddtoCartHandle";
import { favaddFn, getFavouriteProduct } from "@/services/userServ";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Heart = ({ product }: any) => {
  const router = useRouter();
  const context = useContext(UserContext) as ContextProps;
  const queryClient = useQueryClient();
  const [targetedItem, setTargetedItem] = useState<any>(null);

  const { data, isLoading, isError, isFetching, isSuccess, isFetched } =
    useQuery({
      queryKey: ["favourite-fetching"],
      queryFn: async () => {
        const favProducts = await getFavouriteProduct(context.user.data.email);
        console.log("favProducts", favProducts);

        return favProducts.data;
      },
    });

  useEffect(() => {
    if (data && data.length > 0) {
      const targetedProduct = data.find(
        (item: any) => item.sku === product.sku
      );

      setTargetedItem(targetedProduct);
    }
  }, [data, product.sku]);

  const favHanlder = async (id: any) => {
    if (context.user) {
      const response = await favaddFn({
        email: context.user.data.email,
        product,
      });
      console.log(product);
      toast.success(response.message);

      queryClient.refetchQueries();
    } else {
      router.push("/login");
    }
  };

  // const targetedItem = data?.find((item: any) => item === product._id);
  return (
    <>
      {/* <div className="absolute z-10 right-2 top-1"> */}
      <FaHeart
        size={20}
        key={product.sku}
        onClick={() => favHanlder(product.sku)}
        fill={targetedItem?.isFavourite ? "red" : "gray"}
      />
      {/* </div> */}
    </>
  );
};

export default Heart;
