import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthenticationStatus } from "../constant/app";
import axios from "axios";

interface IUser {
  name: string;
  email: string;
  password: string;
  gender: string;
  isDeleted: boolean;
  approvalStatus: "approved" | "rejected" | "pending";
}

const useIsAuthentication = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [authenticationStatus, setAuthenticationStatus] = useState(
    AuthenticationStatus.notAvailabe
  );

  const setAuthenticate = (user: IUser, token: string) => {
    if (!user) {
      throw new Error("user is required");
    }

    localStorage.setItem("AseupUser", JSON.stringify(user));
    localStorage.setItem("Token", token);

    axios.defaults.headers.common.access_token = token;
    navigate("/");
  };

  const check = () => {
    setAuthenticationStatus(AuthenticationStatus.loading);
    const user = localStorage.getItem("AseupUser");
    if (!user && location.pathname !== "/register") {
      setAuthenticationStatus(AuthenticationStatus.notAvailabe);
      navigate("/login");
    } else if (user) {
      setAuthenticationStatus(AuthenticationStatus.availabe);
      setUser(JSON.parse(user))
    } else {
      setAuthenticationStatus(AuthenticationStatus.notAvailabe);
    }
  };

  const deleteAuthenticated = () => {
    localStorage.removeItem("AseupUser");
    navigate("/login");
  };

  useEffect(() => {
    check();
  }, []);

  return {
    user,
    setAuthenticate,
    deleteAuthenticated,
    authenticationStatus
  };
};

export default useIsAuthentication;
