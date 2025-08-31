import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { MyContext } from "../context/GlobalContext";

const Header = () => {
  const { userData } = useContext(MyContext);
  return (
    <div className="flex flex-col items-center mt-20 text-center px-4 text-gray-800">
      <img
        src={assets.header_img}
        className="w-36 h-36 rounded-full mb-6"
        alt=""
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"}
        <img src={assets.hand_wave} className="w-8 aspect-square" alt="" />
      </h1>

      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Welcome to our app
      </h2>
      <p className="max-w-md mb-8 ">
        Let's start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all cursor-pointer">
        Get Started
      </button>
    </div>
  );
};

export default Header;
