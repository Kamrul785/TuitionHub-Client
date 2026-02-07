import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import ShinyText from "../components/Animations/ShinyText";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, errorMsg } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await loginUser(data);
      navigate("/dashboard");
    } catch (error) {
      setError(error?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white border border-blue-100 shadow-xl rounded-2xl p-8">
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-blue-500">
              <ShinyText
                text="Welcome Back"
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
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
              Sign in
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Enter your email and password to access your account
            </p>
          </div>
          {error && (
            <div className="alert alert-error mb-4 text-sm">
              <span>{error}</span>
            </div>
          )}
          {errorMsg && (
            <div className="alert alert-error mb-4 text-sm">
              <span>{errorMsg}</span>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="form-control w-full">
                <span className="label-text text-sm font-medium text-gray-500">
                  Email
                </span>
              </label>
              <input
                id="email"
                type="email"
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label className="form-control w-full">
                <span className="label-text text-sm font-medium text-gray-500">
                  Password
                </span>
              </label>
              <input
                id="password"
                type="password"
                className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                placeholder="********"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"
              disabled={loading}
            >
              {loading && <span className="loading loading-spinner"></span>}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-center mt-5 font-semibold text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
