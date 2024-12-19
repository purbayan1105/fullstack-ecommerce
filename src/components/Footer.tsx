import { FaGithub, FaLinkedin, FaStackOverflow } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="grid lg:grid-cols-3 bg-slate-800 text-white justify-center items-center lg:h-[10dvh]">
        <div className="flex justify-center">
          <span className="text-slate-300">Created By- </span>
          <span> Purbayan Ghosh</span>
        </div>
        <div className="flex justify-center">
          All Coyrights reserved © Gadget World 2024-2025
        </div>
        <div className="flex justify-center items-center gap-5">
          <FaLinkedin size={25} />
          <FaGithub size={25} />
          <FaStackOverflow size={25} />
        </div>
      </div>
    </>
  );
};

export default Footer;
