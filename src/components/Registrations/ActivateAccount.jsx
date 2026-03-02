import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import apiClient from "../../services/api-client";

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await apiClient.post("/auth/users/activation/", { uid, token });
        setMessage("Your account has been activated successfully! Redirecting to login...");
      } catch (error) {
        setError(error.response?.data?.detail || "Account activation failed. Please try again.");
      } finally {
        setTimeout(() => navigate("/login"), 3000);
      }
    };
    activateAccount();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="card-modern p-8 max-w-md w-full text-center">
        {message ? (
          <>
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
              <FiCheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Account Activated</h2>
            <p className="text-sm text-slate-500">{message}</p>
          </>
        ) : error ? (
          <>
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
              <FiAlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Activation Failed</h2>
            <p className="text-sm text-red-600">{error}</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
              <span className="loading loading-spinner loading-md text-indigo-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Activating your account...</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;
