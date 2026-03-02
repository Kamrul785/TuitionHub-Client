import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import apiClient from "../../services/api-client";
import useAuthContext from "../../hooks/useAuthContext";
import { useToast } from "../ui/Toast";
import { FiBookOpen, FiArrowLeft } from "react-icons/fi";

const FieldError = ({ error }) =>
  error ? <p className="text-red-500 text-xs mt-1.5">{error.message}</p> : null;

const EditTuition = () => {
  const { id } = useParams();
  const { user, updateTuition } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchTuition = useCallback(async () => {
    try {
      const response = await apiClient.get(`/tuitions/${id}/`, {
        headers: { Authorization: `JWT ${localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")).access : "" }` },
      });
      if (response.data.tutor_email !== user?.email) {
        toast.error("You can only edit your own tuitions");
        setTimeout(() => navigate("/dashboard/tuitions"), 2000);
        return;
      }
      reset({
        title: response.data.title,
        description: response.data.description,
        class_level: response.data.class_level,
        subject: response.data.subject,
        availability: response.data.availability,
      });
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to fetch tuition details");
    } finally {
      setFetching(false);
    }
  }, [id, user?.email, navigate, reset, toast]);

  useEffect(() => {
    fetchTuition();
  }, [fetchTuition]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        title: data.title,
        description: data.description,
        class_level: data.class_level,
        subject: data.subject,
        availability: data.availability === "true" || data.availability === true,
      };

      const result = await updateTuition(id, payload);
      if (result.success) {
        toast.success("Tuition updated successfully!");
        setTimeout(() => navigate("/dashboard/tuitions"), 1500);
      } else {
        toast.error(result.message || "Failed to update tuition");
      }
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        Object.values(error.response?.data || {})
          .flat()
          .join(", ") ||
        "Failed to update tuition. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          <div className="card-modern p-8 space-y-4">
            <div className="skeleton-pulse h-6 w-40 rounded" />
            <div className="skeleton-pulse h-10 w-full rounded" />
            <div className="skeleton-pulse h-24 w-full rounded" />
            <div className="grid grid-cols-2 gap-4">
              <div className="skeleton-pulse h-10 rounded" />
              <div className="skeleton-pulse h-10 rounded" />
            </div>
            <div className="skeleton-pulse h-10 w-32 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard/tuitions")}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Tuitions
          </button>
        </div>

        <div className="card-modern p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <FiBookOpen className="h-5 w-5 text-indigo-600" />
            </div>
            <h1 className="text-xl font-semibold text-slate-900">Edit Tuition</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 5, message: "Title must be at least 5 characters" },
                })}
              />
              <FieldError error={errors.title} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="4"
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 20, message: "Description must be at least 20 characters" },
                })}
              />
              <FieldError error={errors.description} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Class</label>
                <input
                  type="text"
                  placeholder="e.g., Class 10"
                  className="input input-bordered w-full"
                  {...register("class_level", {
                    required: "Class is required",
                    minLength: { value: 2, message: "Class must be at least 2 characters" },
                  })}
                />
                <FieldError error={errors.class_level} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                <input
                  type="text"
                  placeholder="e.g., Mathematics"
                  className="input input-bordered w-full"
                  {...register("subject", {
                    required: "Subject is required",
                    minLength: { value: 2, message: "Subject must be at least 2 characters" },
                  })}
                />
                <FieldError error={errors.subject} />
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Available Now</p>
                <p className="text-xs text-slate-500">Students can see and apply</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-sm border-slate-300 bg-slate-300 checked:bg-indigo-600 checked:border-indigo-600"
                {...register("availability")}
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none flex-1"
                disabled={loading}
              >
                {loading && <span className="loading loading-spinner loading-sm" />}
                {loading ? "Updating..." : "Update Tuition"}
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
  );
};

export default EditTuition;