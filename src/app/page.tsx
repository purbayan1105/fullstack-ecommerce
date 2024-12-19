import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Macboook from "@/components/Macbook";
import Tablet from "@/components/Tablet";

import Trending from "@/components/TrendingPhonese";

const page = () => {
  return (
    <>
      <Banner />
      <Trending />
      <Macboook />
      <Tablet />
      <Footer />
    </>
  );
};

export default page;
