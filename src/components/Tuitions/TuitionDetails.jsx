import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import apiClient from "../../services/api-client";
import useAuthContext from "../../hooks/useAuthContext";

const TuitionDetails = () => {
  const { id } = useParams();
  const { user, fetchApplications, applyForTuition } = useAuthContext();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetchTuitionDetails = async () => {
      try {
        const response = await apiClient.get(`/tuitions/${id}/`);
        setTuition(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Unable to load tuition details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTuitionDetails();
  }, [id]);

  // Check if user already applied
  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (!user || !tuition) return;

      const applicationsData = await fetchApplications();
      if (Array.isArray(applicationsData)) {
        const existingApp = applicationsData.find(
          (app) => app.tuition === tuition.id,
        );
        setApplicationStatus(existingApp || null);
        console.log("Existing application:", existingApp);
      }
    };

    checkApplicationStatus();
  }, [user, tuition, fetchApplications]);

  const handleApply = async () => {
    if (!user) {
      alert("Please login to apply for tuition.");
      return;
    }

    // Don't allow applying if already has PENDING or ACCEPTED application
    if (applicationStatus && applicationStatus.status !== "REJECTED") {
      alert("You have already applied for this tuition.");
      return;
    }

    setApplying(true);
    const result = await applyForTuition(tuition.id);

    if (result?.success === false) {
      alert("Failed to apply for tuition.");
    } else if (result?.id) {
      setApplicationStatus(result);
      alert("Successfully applied for tuition!");
    } else {
      alert("Application submitted. Please check your applications.");
    }

    setApplying(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }

  if (error || !tuition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-lg w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-6 text-center">
          <p className="text-red-600 font-semibold mb-4">
            {error || "Tuition not found."}
          </p>
          <Link to="/tuitions" className="btn btn-primary">
            Back to Tuitions
          </Link>
        </div>
      </div>
    );
  }

  const canApply =
    !applicationStatus || applicationStatus.status === "REJECTED";

  const getApplyButtonContent = () => {
    if (!applicationStatus) {
      return applying ? "Applying..." : "Apply";
    }

    const status = applicationStatus.status;
    if (status === "PENDING") {
      return "Application Pending";
    } else if (status === "ACCEPTED") {
      return "Accepted";
    } else if (status === "REJECTED") {
      return "Reapply";
    }
    return "Apply";
  };

  const getApplyButtonClass = () => {
    if (!applicationStatus) {
      return "btn btn-primary";
    }

    const status = applicationStatus.status;
    if (status === "ACCEPTED") {
      return "btn btn-success";
    } else if (status === "REJECTED") {
      return "btn btn-error";
    }
    return "btn btn-warning";
  };

  return (
    <div className="bg-linear-to-b from-blue-50 via-white to-blue-100 min-h-screen">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <Link to="/tuitions" className="btn btn-ghost btn-md mb-4">
            ← Back
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {tuition.title}
          </h1>
          <div className="flex flex-wrap gap-2 text-sm text-slate-600">
            <span className="badge badge-outline">{tuition.subject}</span>
            <span className="badge badge-outline">
              Class {tuition.class_level}
            </span>
            <span
              className={`badge ${tuition.availability ? "badge-success" : "badge-ghost"}`}
            >
              {tuition.availability ? "Open" : "Closed"}
            </span>
            <span className="badge badge-outline">
              {new Date(tuition.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Tutor</p>
              <p className="font-semibold text-slate-800">
                {tuition.tutor_email}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Subject</p>
              <p className="font-semibold text-slate-800">{tuition.subject}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-500">Class Level</p>
              <p className="font-semibold text-slate-800">
                {tuition.class_level}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Description
            </h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {tuition.description}
            </p>
          </div>
          <button
            className={`${getApplyButtonClass()} mt-6`}
            onClick={handleApply}
            disabled={applying || !canApply}
          >
            {getApplyButtonContent()}
          </button>
        </div>
      </section>
    </div>
  );
};

export default TuitionDetails;
