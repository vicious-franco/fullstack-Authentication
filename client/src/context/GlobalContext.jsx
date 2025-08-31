import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/users/is-auth", {
        withCredentials: true,
      });

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAuthStatus();
  }, []);

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
