import Link from "next/link";

const Menubar = () => {
  return (
    <>
      <div className="lg:grid grid-cols-3 items-center gap-5 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900  h-[10dvh] text-md font-semibold hidden">
        <div className=" col-span-2 items-center flex justify-center gap-5 text-white">
          <Link href={`/category/phones`}>
            {" "}
            <div className="">Mobile</div>
          </Link>
          <div className="">Accessories</div>
          <Link href={`/category/laptops`}>
            {" "}
            <div className="">Laptops</div>
          </Link>
          <Link href={`/category/tablets`}>
            {" "}
            <div className="">Tablets</div>
          </Link>
          <Link href={`/category/headphones`}>
            {" "}
            <div className="">Headphones</div>
          </Link>
          <div className="">Speakers</div>
        </div>
        <div className="col-span-1 items-center flex justify-center gap-5 text-green-100">
          <Link href="/">
            <div className="">Home</div>
          </Link>

          <div className="">Best Sellers</div>
          <div className="">Offers</div>
          <div className="">Contact</div>
        </div>
      </div>
    </>
  );
};

export default Menubar;
