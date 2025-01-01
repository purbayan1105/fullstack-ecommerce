import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import HeadPhones from "@/components/HeadPhones";
import Macboook from "@/components/Macbook";
import Tablet from "@/components/Tablet";

import Trending from "@/components/TrendingPhonese";

const page = () => {
  return (
    <>
      <Banner />
      <Trending />
      <Macboook />
      <HeadPhones />
      <Tablet />
    </>
  );
};

export default page;
