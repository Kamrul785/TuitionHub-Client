import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
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

  const handleApiError = (
    error,
    defaultMessage = "Something went wrong, Please try again",
  ) => {
    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }
    setErrorMsg(defaultMessage);
    return {
      success: false,
      message: defaultMessage,
    };
  };

  // fetch user
  const fetchUserProfile = async (authTokens) => {
    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
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

  // update user profile
  const updateUserProfile = async (data) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await apiClient.patch("/auth/users/me/", data, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      setSuccessMsg("Profile updated successfully!");
      return { success: true, message: "Profile updated successfully!" };
    } catch (error) {
      return handleApiError(
        error,
        "Failed to update profile, Please try again",
      );
    }
  };

  // password change
  const changePassword = async (data) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await apiClient.post("/auth/users/set_password/", data, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      setSuccessMsg("Password changed successfully!");
      return { success: true, message: "Password changed successfully!" };
    } catch (error) {
      return handleApiError(
        error,
        "Failed to change password, Please try again",
      );
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
      return handleApiError(error, "Login failed, Please Try again");
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
      return handleApiError(error, "Registration failed, Please Try again");
    }
  };

  // resend activation email
  const resndActivationEmail = async (data) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await apiClient.post("/auth/users/resend_activation/", data);
      return setSuccessMsg("Activation email resent successfully!");
    } catch (error) {
      return handleApiError(
        error,
        "Failed to resend activation email, Please Try again",
      );
    }
  };

  // Reset Password - Request
  const resetPasswordRequest = async (email) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await apiClient.post("/auth/users/reset_password/", { email });
      setSuccessMsg(
        "Password reset email sent! Check your email for instructions.",
      );
      return {
        success: true,
        message:
          "Password reset email sent! Check your email for instructions.",
      };
    } catch (error) {
      return handleApiError(
        error,
        "Failed to send reset email. Please try again.",
      );
    }
  };

  // Reset Password - Confirm
  const resetPasswordConfirm = async (data) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      // Try with uid and token in body first
      await apiClient.post("/auth/users/reset_password_confirm/", {
        uid: data.uid,
        token: data.token,
        new_password: data.new_password,
      });
      setSuccessMsg(
        "Password reset successfully! Please login with new password.",
      );
      return {
        success: true,
        message: "Password reset successfully! Please login with new password.",
      };
    } catch (error) {
      return handleApiError(
        error,
        "Failed to reset password. Please try again.",
      );
    }
  };

  // Logout User
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  //Fetch Applications
  const fetchApplications = async () => {
    try {
      const response = await apiClient.get("/applications/", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      return response.data;
    } catch (error) {
      return handleApiError(
        error,
        "Failed to fetch applications, Please Try again",
      );
    }
  };

  // Apply for Tuition
  const applyForTuition = async (tuitionId) => {
    try {
      const response = await apiClient.post(
        "/applications/",
        { tuition: tuitionId },
        {
          headers: { Authorization: `JWT ${authTokens?.access}` },
        },
      );
      return response.data;
    } catch (error) {
      return handleApiError(
        error,
        "Failed to apply for tuition, Please Try again",
      );
    }
  };

  // Fetch Enrollments
  const fetchEnrollments = async () => {
    try {
      const response = await apiClient.get("/enrollments/", {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      return response.data;
    } catch (error) {
      return handleApiError(
        error,
        "Failed to fetch enrollments, Please Try again",
      );
    }
  };

  // Fetch single Enrollment
  const fetchEnrollmentById = async (id) => {
    try {
      const response = await apiClient.get(`/enrollments/${id}/`, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      return response.data;
    } catch (error) {
      return handleApiError(
        error,
        "Failed to fetch enrollment details, Please Try again",
      );
    }
  };

  // Assignments
  const fetchAssignments = async (enrollmentId) => {
    try {
      const response = await apiClient.get(
        `/enrollments/${enrollmentId}/assignments/`,
        {
          headers: { Authorization: `JWT ${authTokens?.access}` },
        },
      );
      return response.data;
    } catch (error) {
      return handleApiError(
        error,
        "Failed to fetch assignments, Please Try again",
      );
    }
  };

  const createAssignment = async (enrollmentId, payload) => {
    try {
      const response = await apiClient.post(
        `/enrollments/${enrollmentId}/assignments/`,
        payload,
        {
          headers: { Authorization: `JWT ${authTokens?.access}` },
        },
      );
      return response.data;
    } catch (error) {
      return handleApiError(
        error,
        "Failed to create assignment, Please Try again",
      );
    }
  };

  const updateAssignment = async (enrollmentId, assignmentId, payload) => {
    try {
      const response = await apiClient.patch(
        `/enrollments/${enrollmentId}/assignments/${assignmentId}/`,
        payload,
        {
          headers: { Authorization: `JWT ${authTokens?.access}` },
        },
      );
      return response.data;
    } catch (error) {
      return handleApiError(
        error,
        "Failed to update assignment, Please Try again",
      );
    }
  };

  const deleteAssignment = async (enrollmentId, assignmentId) => {
    try {
      await apiClient.delete(
        `/enrollments/${enrollmentId}/assignments/${assignmentId}/`,
        {
          headers: { Authorization: `JWT ${authTokens?.access}` },
        },
      );
      return { success: true };
    } catch (error) {
      return handleApiError(
        error,
        "Failed to delete assignment, Please Try again",
      );
    }
  };

  // Topics
  const fetchTopics = async (enrollmentId) => {
    try {
      const response = await apiClient.get(
        `/enrollments/${enrollmentId}/topics/`,
        {
          headers: { Authorization: `JWT ${authTokens?.access}` },
        },
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, "Failed to fetch topics, Please Try again");
    }
  };

  const createTopic = async (enrollmentId, payload) => {
    try {
      const response = await apiClient.post(
        `/enrollments/${enrollmentId}/topics/`,
        payload,
        {
          headers: { Authorization: `JWT ${authTokens?.access}` },
        },
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, "Failed to create topic, Please Try again");
    }
  };

  const updateTopic = async (enrollmentId, topicId, payload) => {
    try {
      const response = await apiClient.patch(
        `/enrollments/${enrollmentId}/topics/${topicId}/`,
        payload,
        {
          headers: { Authorization: `JWT ${authTokens?.access}` },
        },
      );
      return response.data;
    } catch (error) {
      return handleApiError(error, "Failed to update topic, Please Try again");
    }
  };

  const deleteTopic = async (enrollmentId, topicId) => {
    try {
      await apiClient.delete(
        `/enrollments/${enrollmentId}/topics/${topicId}/`,
        {
          headers: { Authorization: `JWT ${authTokens?.access}` },
        },
      );
      return { success: true };
    } catch (error) {
      return handleApiError(error, "Failed to delete topic, Please Try again");
    }
  };

  // Select Application
  const selectApplication = async (id, tuition) => {
    try {
      await apiClient.post(`/applications/${id}/select/`, tuition, {
        headers: { Authorization: `JWT ${authTokens?.access}` },
      });
      console.log("Application accepted successfully.");
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  return {
    user,
    loginUser,
    registerUser,
    errorMsg,
    successMsg,
    loadingUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    resndActivationEmail,
    resetPasswordRequest,
    resetPasswordConfirm,
    fetchApplications,
    applyForTuition,
    fetchEnrollments,
    fetchEnrollmentById,
    fetchAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    fetchTopics,
    createTopic,
    updateTopic,
    deleteTopic,
    selectApplication,
  };
};

export default useAuth;
