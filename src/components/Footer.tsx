"use client";

import { FaGithub, FaLinkedin, FaReact, FaStackOverflow } from "react-icons/fa";
import BackToStart from "./BackToStart";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const navigateToSocials = (route: any) => {
    router.push(route);
  };
  return (
    <>
      <div className="grid lg:grid-cols-6 bg-slate-800 text-white justify-center items-center lg:h-[10dvh] relative space-y-6 lg:space-y-0 py-4 lg:py-0">
        <div className="flex lg:justify-center gap-3 col-span-2 items-center">
          <FaReact size={25} />
          <span className="text-slate-300">Developer- </span>
          <span> &lt; Purbayan Ghosh/ &gt; </span>
        </div>
        <div className="flex lg:justify-center col-span-2 gap-2">
          <span> All Coyrights reserved ©</span>
          <span> Gadget's World</span>
        </div>
        <div className="flex lg:justify-center items-center gap-5">
          <FaLinkedin
            size={25}
            onClick={() =>
              navigateToSocials(
                "https://www.linkedin.com/in/purbayan-ghosh-a01b37194/"
              )
            }
          />
          <FaGithub
            size={25}
            onClick={() =>
              navigateToSocials(
                "https://github.com/purbayan1105/fullstack-ecommerce"
              )
            }
          />
        </div>

        <BackToStart />
      </div>
    </>
  );
};

export default Footer;
