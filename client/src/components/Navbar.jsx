import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { MyContext } from "../context/GlobalContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setIsLoggedin, setUserData } =
    useContext(MyContext);
  console.log(backendUrl);

  const logOut = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout", {
        withCredentials: true,
      });

      if (data.success) {
        navigate("/");
        setIsLoggedin(false);
        setUserData(false);

        toast.success(data.message, {
          position: "top-center",
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 ">
      <img src={assets.logo} alt="website logo" className="w-28 sm:w-32" />
      {userData ? (
        <div className="group bg-black  h-8 w-8 text-white rounded-full flex items-center justify-center font-bold  relative">
          <h1>{userData.name[0].toUpperCase()}</h1>
          <div className="hidden absolute top-8 right-0   text-black font-normal lowecase capitalize group-hover:block">
            <ul className=" text-start m-0 p-2 list-none bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li className="text-nowrap py-1 px-2 hover:bg-gray-200 cursor-pointer">
                  verify email
                </li>
              )}
              <li
                onClick={logOut}
                className="text-nowrap py-1 px-2 hover:bg-gray-200 cursor-pointer"
              >
                logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border  border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
