import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router";
import { useToast } from "../components/ui/Toast";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerUser, errorMsg } = useAuthContext();

  const onSubmit = async (data) => {
    delete data.confirm_password;
    setLoading(true);
    try {
      const result = await registerUser(data);
      if (result.success) {
        toast.success(result.message || "Registration successful! Check your email.");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ error }) =>
    error ? <p className="text-xs text-red-500 mt-1">{error.message}</p> : null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight">
            TuitionHub
          </Link>
        </div>

        <div className="card-modern p-7">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-slate-900">Create account</h1>
            <p className="text-sm text-slate-400 mt-1">
              Fill in the details to get started
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 mb-4">{errorMsg}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="input input-bordered w-full"
                  {...register("first_name", { required: "Required" })}
                />
                <FieldError error={errors.first_name} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="input input-bordered w-full"
                  {...register("last_name", { required: "Required" })}
                />
                <FieldError error={errors.last_name} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                })}
              />
              <FieldError error={errors.email} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
              <input
                type="text"
                placeholder="123 Main St"
                className="input input-bordered w-full"
                {...register("address")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
              <input
                type="tel"
                placeholder="01X-XXXX-XXXX"
                className="input input-bordered w-full"
                {...register("phone_number")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
              <div className="flex gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="User"
                    className="radio radio-sm border-slate-300 checked:bg-indigo-600"
                    {...register("role", { required: "Role is required" })}
                  />
                  <span className="text-sm text-slate-700">Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="Tutor"
                    className="radio radio-sm border-slate-300 checked:bg-indigo-600"
                    {...register("role", { required: "Role is required" })}
                  />
                  <span className="text-sm text-slate-700">Teacher</span>
                </label>
              </div>
              <FieldError error={errors.role} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="Min 8 characters"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Min 8 characters" },
                })}
              />
              <FieldError error={errors.password} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="input input-bordered w-full"
                {...register("confirm_password", {
                  required: "Please confirm password",
                  validate: (value) => value === watch("password") || "Passwords don't match",
                })}
              />
              <FieldError error={errors.confirm_password} />
            </div>

            <button
              type="submit"
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-0 w-full"
              disabled={loading}
            >
              {loading && <span className="loading loading-spinner loading-sm"></span>}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-5 space-y-2 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">Sign in</Link>
            </p>
            <p className="text-xs text-slate-400">
              <Link to="/resend-activation" className="hover:text-indigo-600 transition-colors">
                Resend activation email
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
