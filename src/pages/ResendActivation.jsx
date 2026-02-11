import React from "react";
import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";

const ResendActivation = () => {
  const { resndActivationEmail, errorMsg, successMsg } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await resndActivationEmail(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4">Resend Activation Email</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          className="input input-bordered w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
        {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 text-sm mt-1">{successMsg}</p>}
        <button type="submit" className="btn btn-primary mt-4">
          Resend Activation Email
        </button>
      </form>
    </div>
  );
};

export default ResendActivation;
