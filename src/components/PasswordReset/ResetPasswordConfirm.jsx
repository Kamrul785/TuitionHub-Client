import React from "react";
import { useForm } from "react-hook-form";
import { FiLock } from "react-icons/fi";
import useAuthContext from "../../hooks/useAuthContext";
import { useParams } from "react-router";

const ResetPasswordConfirm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { uid, token } = useParams();
  const { resetPasswordConfirm, errorMsg, successMsg } = useAuthContext();

  const onSubmit = async (data) => {
    try {
      const result = await resetPasswordConfirm({
        uid,
        token,
        new_password: data.new_password,
      });
      if (result.success) {
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="card-modern p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <FiLock className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Reset Your Password</h2>
          <p className="text-sm text-slate-500 mt-1">Enter your new password below</p>
        </div>

        {errorMsg && <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm mb-4">{errorMsg}</div>}
        {successMsg && <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm mb-4">{successMsg}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="new_password">New Password</label>
            <input
              type="password"
              id="new_password"
              className="input input-bordered w-full"
              {...register("new_password", { required: "New password is required" })}
            />
            {errors.new_password && <p className="text-red-500 text-xs mt-1.5">{errors.new_password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              className="input input-bordered w-full"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) => value === watch("new_password") || "Passwords do not match",
              })}
            />
            {errors.confirm_password && <p className="text-red-500 text-xs mt-1.5">{errors.confirm_password.message}</p>}
          </div>

          <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none w-full">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
