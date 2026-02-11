import React from "react";
import { useForm } from "react-hook-form";
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
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4">Reset Password Confirmation</h2>
        {errorMsg && (
          <div className="alert alert-error mb-4 text-sm">
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="alert alert-success mb-4 text-sm">
            <span>{successMsg}</span>
          </div>
        )}
        <label className="label" htmlFor="new_password">
          New Password
        </label>
        <input
          type="password"
          id="new_password"
          name="new_password"
          className="input input-bordered w-full mb-4"
          {...register("new_password", {
            required: "New password is required",
          })}
        />
        {errors.new_password && (
          <p className="text-red-500 text-sm">{errors.new_password.message}</p>
        )}
        <label className="label" htmlFor="confirm_password">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          className="input input-bordered w-full mb-4"
          {...register("confirm_password", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("new_password") || "Passwords do not match",
          })}
        />
        {errors.confirm_password && (
          <p className="text-red-500 text-sm">
            {errors.confirm_password.message}
          </p>
        )}
        <button type="submit" className="btn btn-primary w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordConfirm;
