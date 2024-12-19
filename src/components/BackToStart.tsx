"use client";
import { useState } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

const BackToStart = () => {
  const [showText, setShowText] = useState(false);

  const onMouseOverFn = () => {
    setShowText(true);
  };

  const onMouseOutFn = () => {
    setShowText(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="absolute text-white right-4">
      <div
        className={`flex justify-center items-center gap-2 cursor-pointer  ${
          showText && "bg-white px-3 py-2 rounded-full text-black"
        }`}
        onMouseOver={onMouseOverFn}
        onMouseOut={onMouseOutFn}
        onClick={scrollToTop}>
        <FaRegArrowAltCircleUp size={25} />

        {showText && (
          <div className="text-lg showText-animation ">Scroll Up</div>
        )}
      </div>
    </div>
  );
};

export default BackToStart;
