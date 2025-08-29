import React, { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [sign, setsign] = useState("Sign Up");
  return (
    <div className="flex items-center  justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        className="absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer "
      />
      <div className="bg-slate-900  p-10 rounded-lg shadoow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="capitalize block w-full  text-wrap text-3xl font-semibold text-white text-center mb-3">
          {sign === "Sign Up" ? "createAccount" : "login "}
        </h2>
        <p className="text-sm text-center mb-6">
          {sign === "Sign Up" ? "create Your Account" : "login your account"}
        </p>
        <form className="">
          <div className=" mb-4 flex itemsocenter gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.person_icon} alt="" />
            <input
              className="bg-transparent outline-none text-white"
              type="text"
              name="name"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="mb-4 flex itemsocenter gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              className="bg-transparent outline-none text-white"
              type="email"
              name="name"
              placeholder="Email ID"
              required
            />
          </div>
          <div className=" mb-4 flex itemsocenter gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              className="bg-transparent outline-none text-white"
              type="password"
              name="name"
              placeholder="password"
              required
            />
          </div>
          <p className="capitalize mb-4 text-indigo-500 cursor-pointer text-center ">
            forgot password?
          </p>
          <button className="rounded-full border border-gray-600 bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white  py-2.5 w-full cursor-pointer">
            {sign}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-3 capitalize text-xs">
          already have an account?{" "}
          <span className="cursor-pointer text-blue-400 underline">
            Login here
          </span>
        </p>
        <p className="text-center text-gray-400 mt-3 capitalize text-xs">
          don't have an account?{" "}
          <span className="cursor-pointer text-blue-400 underline">
            sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
