import React from "react";
import { useForm } from "react-hook-form";
import { FiMail } from "react-icons/fi";
import useAuthContext from "../hooks/useAuthContext";

const ResendActivation = () => {
  const { resendActivationEmail, errorMsg, successMsg } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await resendActivationEmail(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="card-modern p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <FiMail className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Resend Activation Email</h2>
          <p className="text-sm text-slate-500 mt-1">Enter your email to receive a new activation link</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
          </div>

          {errorMsg && <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm">{errorMsg}</div>}
          {successMsg && <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm">{successMsg}</div>}

          <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none w-full">
            Resend Activation Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResendActivation;
