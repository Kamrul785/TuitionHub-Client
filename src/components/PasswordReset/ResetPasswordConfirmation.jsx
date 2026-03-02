import React from "react";
import { Link } from "react-router";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

const ResetPasswordConfirmation = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="card-modern p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <FiCheckCircle className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900 mb-2">Password Reset Successful</h1>
        <p className="text-sm text-slate-500 mb-6">
          Your password has been updated. You can now login with your new password.
        </p>
        <Link
          to="/login"
          className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none w-full"
        >
          Go to Login
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmation;
