import React from "react";

const ResetPasswordConfirmation = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      Password Reset successful! You can now{" "}
      <a href="/login" className="text-blue-500">
        login
      </a>{" "}
      with your new password.
    </div>
  );
};

export default ResetPasswordConfirmation;
