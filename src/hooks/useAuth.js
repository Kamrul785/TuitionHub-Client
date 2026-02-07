import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  useEffect(() => {
    if (authTokens) {
      fetchUserProfile(authTokens);
    } else {
      setLoadingUser(false);
    }
  }, [authTokens]);

  // fetch user
  const fetchUserProfile = async (tokens) => {
    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: { Authorization: `JWT ${tokens?.access}` },
      });
      setUser(response.data);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.detail || "Failed to fetch user profile",
      );
    } finally {
      setLoadingUser(false);
    }
  };

  //login user
  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      await fetchUserProfile(response.data);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.detail || "Login failed, Please Try again",
      );
      throw error;
    }
  };

  // Register User
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message:
          "Registration successful, Check your email to activate your account.",
      };
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = Object.values(error.response.data)
          .flat()
          .join("\n");
        setErrorMsg(errorMessage);
        return { success: false, message: errorMessage };
      }
      setErrorMsg("Registration failed, Please Try again");
      return {
        success: false,
        message: "Registration failed, Please Try again",
      };
    }
  };

  // Logout User
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return { user, loginUser, registerUser, errorMsg, loadingUser, logoutUser };
};

export default useAuth;
