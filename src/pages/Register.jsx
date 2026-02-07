import React, { useState } from "react";
import ShinyText from "../components/Animations/ShinyText";
import { useForm } from "react-hook-form";
import useAuthContext from "../hooks/useAuthContext";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
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
        setSuccessMsg(result.message);
        // setTimeout(() => {
        //   navigate("/login");
        // }, 3000);
      }
    } catch (error) {
      console.log("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white border border-blue-100 p-8 rounded-2xl shadow-xl">
          <div className="mb-6 text-center">
            <p>
              <ShinyText
                text="Welcome to Tuition Hub"
                speed={3}
                delay={0.5}
                color="#3b25c1"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover
                disabled={false}
              />
            </p>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">Register</h1>
            <p className="text-slate-500 text-sm mt-2">
              Please fill in the form to create an account.
            </p>
          </div>
          {/* error msg and success msg  */}
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="first_name">
                <span className="label-text text-sm font-medium text-gray-500">
                  First Name
                </span>
              </label>
              <input
                type="text"
                id="first_name"
                placeholder="John"
                className={`input input-bordered w-full ${errors.first_name ? "input-error" : ""}`}
                {...register("first_name", {
                  required: "First name is required",
                })}
              />
              {errors.first_name && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.first_name.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="last_name">
                <span className="label-text text-sm font-medium text-gray-500">
                  Last Name
                </span>
              </label>
              <input
                type="text"
                id="last_name"
                placeholder="Doe"
                className={`input input-bordered w-full ${errors.last_name ? "input-error" : ""}`}
                {...register("last_name", {
                  required: "Last name is required",
                })}
              />
              {errors.last_name && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.last_name.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text text-sm font-medium text-gray-500">
                  Email
                </span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </span>
              )}{" "}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="address">
                <span className="label-text text-sm font-medium text-gray-500">
                  Address
                </span>
              </label>
              <input
                type="text"
                id="address"
                placeholder="123 Main St"
                className="input input-bordered w-full"
                {...register("address")}
              />
              {errors.address && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.address.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="phone_number">
                <span className="label-text text-sm font-medium text-gray-500">
                  Phone Number
                </span>
              </label>
              <input
                type="tel"
                id="phone_number"
                placeholder="123-456-7890"
                className="input input-bordered w-full"
                {...register("phone_number")}
              />
            </div>
            <div className="form-control">
              <span className="label-text text-sm font-medium text-gray-500">
                Role
              </span>
              <div className="mt-2 flex items-center gap-4">
                <label
                  className="inline-flex items-center gap-2 cursor-pointer"
                  htmlFor="role"
                >
                  <input
                    type="radio"
                    value="User"
                    className="radio radio-primary"
                    {...register("role", { required: "Role is required" })}
                  />
                  <span className="text-sm text-gray-700">Student</span>
                </label>
                <label
                  className="inline-flex items-center gap-2 cursor-pointer"
                  htmlFor="role"
                >
                  <input
                    type="radio"
                    value="Tutor"
                    className="radio radio-primary"
                    {...register("role", { required: "Role is required" })}
                  />
                  <span className="text-sm text-gray-700">Teacher</span>
                </label>
              </div>
              {errors.role && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.role.message}
                </span>
              )}
            </div>
            <div>
              <label className="form-control" htmlFor="password">
                <span className="label-text text-sm font-medium text-gray-500">
                  Password
                </span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div>
              <label className="form-control" htmlFor="confirmPassword">
                <span className="label-text text-sm font-medium text-gray-500">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter password"
                className={`input input-bordered w-full ${errors.confirm_password ? "input-error" : ""}`}
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") ||
                    "Confirm passwords do not match",
                })}
              />
              {errors.confirm_password && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading && <span className="loading loading-spinner"></span>}
              {loading ? "Registering..." : "Register"}
            </button>{" "}
          </form>
          <div>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-primary">
                {" "}
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
