import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/GlobalContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [sign, setsign] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setIsLoggedin, getUserData } = useContext(MyContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      if (sign === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name: name,
          email: email,
          password: password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else if (sign === "Login") {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email: email,
          password: password,
        });
        if (data.success) {
          setIsLoggedin(true);
          navigate("/");
          getUserData();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center  justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 sm:w-32 cursor-pointer "
      />
      <div className="bg-slate-900  p-10 rounded-lg shadoow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="capitalize block w-full  text-wrap text-3xl font-semibold text-white text-center mb-3">
          {sign === "Sign Up" ? "create Account" : "login "}
        </h2>
        <p className="text-sm text-center mb-6">
          {sign === "Sign Up" ? "create Your Account" : "login your account"}
        </p>
        <form onSubmit={onSubmitHandler}>
          {sign === "Sign Up" && (
            <div className=" mb-4 flex itemsocenter gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none text-white"
                type="text"
                name="name"
                placeholder="Full Name"
                required
              />
            </div>
          )}
          <div className="mb-4 flex itemsocenter gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none text-white"
              type="email"
              name="email"
              placeholder="Email ID"
              required
            />
          </div>
          <div className=" mb-4 flex itemsocenter gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none text-white"
              type="password"
              name="password"
              placeholder="password"
              required
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="capitalize mb-4 text-indigo-500 hover:text-indigo-300 cursor-pointer block m-auto transition-all w-fit "
          >
            forgot password?
          </p>
          <button className="rounded-full  bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white  py-2.5 w-full cursor-pointer">
            {sign}
          </button>
        </form>
        {sign === "Sign Up" ? (
          <p className="text-center text-gray-400 mt-3 capitalize text-xs">
            already have an account?{" "}
            <span
              onClick={() => setsign("Login")}
              className="cursor-pointer text-blue-400 underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center text-gray-400 mt-3 capitalize text-xs">
            don't have an account?{" "}
            <span
              onClick={() => setsign("Sign Up")}
              className="cursor-pointer text-blue-400 underline"
            >
              sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
