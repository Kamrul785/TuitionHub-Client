import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { FiArrowLeft } from "react-icons/fi";
import { useToast } from "../ui/Toast";
import SectionHeader from "../ui/SectionHeader";

const AddTuition = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { createTuition } = useAuthContext();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      class_level: "",
      subject: "",
      availability: true,
      is_paid: false,
      price: "",
    },
  });

  const isPaid = watch("is_paid");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        title: data.title,
        description: data.description,
        class_level: data.class_level,
        subject: data.subject,
        availability: data.availability === "true" || data.availability === true,
        is_paid: data.is_paid === "true" || data.is_paid === true,
      };

      if (payload.is_paid && data.price) {
        payload.price = parseFloat(data.price);
      }

      const result = await createTuition(payload);
      if (result?.success) {
        toast.success("Tuition posted successfully!");
        reset();
        setTimeout(() => navigate("/dashboard/tuitions"), 1500);
      } else {
        toast.error(result?.message || "Failed to create tuition");
      }
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        Object.values(error.response?.data || {}).flat().join(", ") ||
        "Failed to create tuition. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const FieldError = ({ error }) =>
    error ? <p className="text-xs text-red-500 mt-1.5">{error.message}</p> : null;

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => navigate("/dashboard/tuitions")}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to tuitions
        </button>
        <SectionHeader
          title="Add New Tuition"
          description="Fill in the details to post a new tuition offering."
        />
      </div>

      <div className="card-modern max-w-2xl mx-auto">
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
              <input
                type="text"
                placeholder="e.g., Physics (Class 10) - Advanced Topics"
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
                placeholder="Describe your tuition offering..."
                className="textarea textarea-bordered w-full"
                rows="4"
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 20, message: "Description must be at least 20 characters" },
                })}
              />
              <FieldError error={errors.description} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Class</label>
                <input
                  type="text"
                  placeholder="e.g., Class 10"
                  className="input input-bordered w-full"
                  {...register("class_level", {
                    required: "Class is required",
                    minLength: { value: 2, message: "Min 2 characters" },
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
                    minLength: { value: 2, message: "Min 2 characters" },
                  })}
                />
                <FieldError error={errors.subject} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  className="toggle toggle-sm border-slate-300 checked:bg-indigo-600 checked:border-indigo-600"
                  {...register("availability")}
                  defaultChecked={true}
                />
                <span className="text-sm font-medium text-slate-700">Available now</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  className="toggle toggle-sm border-slate-300 checked:bg-indigo-600 checked:border-indigo-600"
                  {...register("is_paid")}
                />
                <span className="text-sm font-medium text-slate-700">Paid tuition</span>
              </label>
            </div>

            {isPaid && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Price (BDT)</label>
                <input
                  type="number"
                  placeholder="e.g., 5000"
                  className="input input-bordered w-full"
                  step="0.01"
                  {...register("price", {
                    required: isPaid ? "Price is required for paid tuitions" : false,
                    min: { value: 0, message: "Price must be 0 or greater" },
                  })}
                />
                <FieldError error={errors.price} />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-0 flex-1"
                disabled={loading}
              >
                {loading && <span className="loading loading-spinner loading-sm"></span>}
                {loading ? "Creating..." : "Create Tuition"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/tuitions")}
                className="btn btn-ghost"
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

export default AddTuition;
