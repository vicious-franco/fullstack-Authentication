import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState("leon");

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/users/data", {
        withCredentials: true,
      });
      if (data.success) {
        console.log(data.userData);
        return setUserData(data.userData);
      }
      toast.error(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const data = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };
  return <MyContext.Provider value={data}>{children}</MyContext.Provider>;
};
