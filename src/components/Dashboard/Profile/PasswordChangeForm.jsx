import { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const PasswordChangeForm = ({ register, errors, watch, isEditing }) => {
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-8 pt-6 border-t border-slate-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiLock className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">Change Password</span>
        </div>
        <button
          type="button"
          className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
            isPasswordEditing
              ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
          }`}
          onClick={(e) => { e.preventDefault(); setIsPasswordEditing((prev) => !prev); }}
        >
          {isPasswordEditing ? "Cancel" : "Change"}
        </button>
      </div>

      {isPasswordEditing && (
        <div className="mt-4 space-y-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
            <input type={showPassword ? "text" : "password"} disabled={!isEditing}
              className="input input-bordered w-full"
              {...register("current_password", { required: "Current password is required" })} />
            {errors.current_password && <p className="text-red-500 text-xs mt-1">{errors.current_password.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
              <input type={showPassword ? "text" : "password"} disabled={!isEditing}
                className="input input-bordered w-full"
                {...register("new_password", { required: "New password is required" })} />
              {errors.new_password && <p className="text-red-500 text-xs mt-1">{errors.new_password.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
              <input type={showPassword ? "text" : "password"} disabled={!isEditing}
                className="input input-bordered w-full"
                {...register("confirm_password", {
                  validate: (value) => value === watch("new_password") || "Passwords do not match",
                })} />
              {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>}
            </div>
          </div>
          {isEditing && (
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
              {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              <input type="checkbox" className="toggle toggle-sm" checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)} />
              <span>{showPassword ? "Hide" : "Show"} passwords</span>
            </label>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;
