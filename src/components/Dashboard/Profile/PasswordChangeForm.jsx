import React, { useState } from "react";

const PasswordChangeForm = ({ register, errors, watch, isEditing }) => {
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordChangeClick = (e) => {
    e.preventDefault();
    setIsPasswordEditing((prev) => !prev);
  };
  return (
    <div className="mt-6 p-4 ">
      <div>
        <span>Want to change your password?</span>
        <button
          className="btn btn-sm ms-4 bg-purple-800 hover:bg-purple-900 text-white"
          onClick={handlePasswordChangeClick}
        >
          {isPasswordEditing ? "NO" : "YES"}
        </button>
      </div>
      {isPasswordEditing && (
        <div className="space-y-3 mt-4 ms-6">
          <div>
            <label className="label" label="Current Password">
              Current Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="current_password"
              name="current_password"
              disabled={!isEditing}
              className="input input-bordered w-full mb-4"
              {...register("current_password", {
                required: "Current password is required",
              })}
            />
            {errors.current_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.current_password.message}
              </p>
            )}
          </div>

          <div>
            <label className="label" label="New Password">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="new_password"
              name="new_password"
              disabled={!isEditing}
              className="input input-bordered w-full mb-4"
              {...register("new_password", {
                required: "New password is required",
              })}
            />
            {errors.new_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.new_password.message}
              </p>
            )}
          </div>
          <div>
            <label className="label" label="Confirm Password">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              disabled={!isEditing}
              className="input input-bordered w-full mb-4"
              {...register("confirm_password", {
                validate: (value) =>
                  value === watch("new_password") || "Passwords do not match",
              })}
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {/* show password checkbox */}
          {isEditing && (
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Show Password</span>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;
