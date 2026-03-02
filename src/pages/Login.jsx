import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import { useToast } from "../components/ui/Toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, errorMsg, successMsg, resetPasswordRequest } =
    useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await loginUser(data);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email address");
      return;
    }
    setResetLoading(true);
    try {
      const result = await resetPasswordRequest(resetEmail);
      if (result.success) {
        setShowResetPassword(false);
        setResetEmail("");
        toast.success("Password reset email sent!");
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="text-xl font-bold text-indigo-600 tracking-tight">
            TuitionHub
          </Link>
        </div>

        <div className="card-modern p-7">
          {showResetPassword ? (
            <>
              <div className="mb-6">
                <h1 className="text-xl font-bold text-slate-900">Reset Password</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Enter your email to receive reset instructions
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleResetPassword}
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-0 w-full"
                  disabled={resetLoading}
                >
                  {resetLoading && <span className="loading loading-spinner loading-sm"></span>}
                  {resetLoading ? "Sending..." : "Send Reset Email"}
                </button>
                <button
                  onClick={() => { setShowResetPassword(false); setResetEmail(""); }}
                  className="btn btn-ghost w-full text-slate-500"
                >
                  Back to Sign In
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-xl font-bold text-slate-900">Sign in</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Enter your credentials to continue
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 mb-4">{errorMsg}</div>
              )}
              {successMsg && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-sm text-emerald-600 mb-4">{successMsg}</div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="you@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="********"
                    {...register("password", { required: "Password is required" })}
                  />
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
                </div>

                <button
                  type="submit"
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-0 w-full"
                  disabled={loading}
                >
                  {loading && <span className="loading loading-spinner loading-sm"></span>}
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <button
                onClick={() => setShowResetPassword(true)}
                className="text-sm mt-3 font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Forgot password?
              </button>

              <p className="text-sm text-center mt-5 text-slate-400">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
                  Register
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
