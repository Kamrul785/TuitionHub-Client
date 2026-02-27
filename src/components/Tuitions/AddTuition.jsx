import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { FiBookOpen, FiArrowLeft, FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

const AddTuition = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { createTuition } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      class_level: "",
      subject: "",
      availability: true,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const payload = {
        title: data.title,
        description: data.description,
        class_level: data.class_level,
        subject: data.subject,
        availability:
          data.availability === "true" || data.availability === true,
      };

      const result = await createTuition(payload);
      if (result.success) {
        setSuccessMsg("Tuition posted successfully!");
        reset();
        setTimeout(() => {
          navigate("/dashboard/tuitions");
        }, 1500);
      } else {
        setErrorMsg(result.message || "Failed to create tuition");
      }
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        Object.values(error.response?.data || {})
          .flat()
          .join(", ") ||
        "Failed to create tuition. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard/tuitions")}
            className="btn btn-ghost btn-sm gap-2 mb-4"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <FiBookOpen className="h-6 w-6 text-white" />
            </div>
            Add New Tuition
          </h1>
        </div>

        {/* Messages */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
            <FiCheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">{successMsg}</p>
          </div>
        )}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
            <FiAlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{errorMsg}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="card bg-white shadow-md border border-slate-200">
          <div className="card-body p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div className="form-control w-full">
                <label className="label pb-2">
                  <span className="label-text font-semibold text-slate-900">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Physics (Class 10) - Advanced Topics"
                  className="input input-bordered w-full"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 5,
                      message: "Title must be at least 5 characters",
                    },
                  })}
                />
                {errors.title && (
                  <label className="label pt-2">
                    <span className="label-text-alt text-error text-xs">
                      {errors.title.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Description */}
              <div className="form-control w-full">
                <label className="label pb-2">
                  <span className="label-text font-semibold text-slate-900">Description</span>
                </label>
                <textarea
                  placeholder="Describe your tuition offering..."
                  className="textarea textarea-bordered w-full"
                  rows="5"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 20,
                      message: "Description must be at least 20 characters",
                    },
                  })}
                />
                {errors.description && (
                  <label className="label pt-2">
                    <span className="label-text-alt text-error text-xs">
                      {errors.description.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Class Level */}
              <div className="form-control w-full">
                <label className="label pb-2">
                  <span className="label-text font-semibold text-slate-900">Class</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Class 10, Grade 8"
                  className="input input-bordered w-full"
                  {...register("class_level", {
                    required: "Class is required",
                    minLength: {
                      value: 2,
                      message: "Class must be at least 2 characters",
                    },
                  })}
                />
                {errors.class_level && (
                  <label className="label pt-2">
                    <span className="label-text-alt text-error text-xs">
                      {errors.class_level.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Subject */}
              <div className="form-control w-full">
                <label className="label pb-2">
                  <span className="label-text font-semibold text-slate-900">Subject</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mathematics, Physics"
                  className="input input-bordered w-full"
                  {...register("subject", {
                    required: "Subject is required",
                    minLength: {
                      value: 2,
                      message: "Subject must be at least 2 characters",
                    },
                  })}
                />
                {errors.subject && (
                  <label className="label pt-2">
                    <span className="label-text-alt text-error text-xs">
                      {errors.subject.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Availability */}
              <div className="form-control w-full">
                <label className="label cursor-pointer">
                  <span className="label-text font-semibold text-slate-900">Available Now</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    {...register("availability")}
                    defaultChecked={true}
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={loading}
                >
                  {loading && (
                    <span className="loading loading-spinner loading-sm"></span>
                  )}
                  {loading ? "Creating..." : "Create Tuition"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/tuitions")}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTuition;
