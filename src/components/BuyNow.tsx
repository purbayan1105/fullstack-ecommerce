import { useRouter } from "next/navigation";

const BuyNow = ({ productId }: any) => {
  const router = useRouter();

  console.log(productId);

  const buyItemHandle = (id: any) => {
    router.push(`/buy-item/${id}`);
  };

  return (
    <>
      <button
        className="text-lg border-2 border-black border-solid text-whoite px-3 py-2 rounded-lg w-full "
        onClick={() => buyItemHandle(productId)}>
        Buy Now
      </button>
    </>
  );
};

export default BuyNow;
