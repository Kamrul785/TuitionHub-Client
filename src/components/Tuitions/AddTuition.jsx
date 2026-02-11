import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import apiClient from "../../services/api-client";
import { FiBookOpen, FiArrowLeft } from "react-icons/fi";

const AddTuition = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

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

      await apiClient.post("/tuitions/", payload);
      setSuccessMsg("Tuition posted successfully!");
      reset();
      setTimeout(() => {
        navigate("/dashboard/tuitions");
      }, 1500);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-2">
          <button
            onClick={() => navigate("/dashboard/tuitions")}
            className="btn btn-ghost btn-sm gap-2"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        {/* Card */}
        <div className="card bg-white shadow-sm border border-slate-200">
          <div className="card-body">
            <h1 className="card-title text-2xl flex items-center gap-2 mb-6">
              <FiBookOpen className="text-primary" />
              Add New Tuition
            </h1>

            {/* Messages */}
            {successMsg && (
              <div className="alert alert-success mb-4">
                <span>{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div className="alert alert-error mb-4">
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Title *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Physics (Class 10) - Advanced Topics"
                  className="input input-bordered"
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 5,
                      message: "Title must be at least 5 characters",
                    },
                  })}
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.title.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Description *</span>
                </label>
                <textarea
                  placeholder="Describe your tuition offering..."
                  className="textarea textarea-bordered"
                  rows="4"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 20,
                      message: "Description must be at least 20 characters",
                    },
                  })}
                />
                {errors.description && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.description.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Class & Subject Row */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Class Level */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Class *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Class 10, Class 12, Grade 8"
                    className="input input-bordered"
                    {...register("class_level", {
                      required: "Class is required",
                      minLength: {
                        value: 2,
                        message: "Class must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.class_level && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.class_level.message}
                      </span>
                    </label>
                  )}
                </div>

                {/* Subject */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Subject *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Mathematics, Physics, English"
                    className="input input-bordered"
                    {...register("subject", {
                      required: "Subject is required",
                      minLength: {
                        value: 2,
                        message: "Subject must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.subject && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.subject.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text font-medium">Available Now</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    {...register("availability")}
                    defaultChecked={true}
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
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
