import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import apiClient from "../../services/api-client";

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await apiClient.post("/auth/users/activation/", {
          uid,
          token,
        });
        setMessage(
          "Your account has been activated successfully! You can now log in.",
        );
      } catch (error) {
        setError(
          error.response?.data?.detail ||
            "Account activation failed. Please try again.",
        );
      } finally {
        setTimeout(() => {navigate("/login");}, 3000);
      }
    };
    activateAccount();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-white to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Account Activation
        </h2>
        {message && <div className="alert alert-success mb-4">{message}</div>}
        {error && <div className="alert alert-error mb-4">{error}</div>}
      </div>
    </div>
  );
};

export default ActivateAccount;
