import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { FiEdit2, FiTrash2, FiPlus, FiBookOpen } from "react-icons/fi";
import apiClient from "../../services/api-client";
import useAuthContext from "../../hooks/useAuthContext";

const MyTuitions = () => {
  const { user } = useAuthContext();
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!user?.email) return;
    fetchTuitions();
  }, [user]);
  const fetchTuitions = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/tuitions/");
      // Filter only current tutor's tuitions by comparing tutor_email
      const allTuitions = response.data.results || response.data || [];
      const myTuitions = allTuitions.filter(
        (tuition) => tuition.tutor_email === user?.email,
      );
      setTuitions(myTuitions);
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Failed to fetch tuitions");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tuition?")) {
      return;
    }

    setDeleting(id);
    try {
      await apiClient.delete(`/tuitions/${id}/`);
      setSuccessMsg("Tuition deleted successfully!");
      setTuitions(tuitions.filter((t) => t.id !== id));
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      setErrorMsg(error?.response?.data?.message || "Failed to delete tuition");
      setTimeout(() => setErrorMsg(""), 3000);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <FiBookOpen className="text-primary" />
              My Tuitions
            </h1>
            <p className="text-slate-600 mt-1">Manage your posted tuitions</p>
          </div>
          <Link to="/dashboard/tuitions/new" className="btn btn-primary gap-2">
            <FiPlus className="h-4 w-4" />
            Add Tuition
          </Link>
        </div>

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

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : tuitions.length === 0 ? (
          <div className="card bg-white shadow-sm border border-slate-200">
            <div className="card-body text-center py-12">
              <FiBookOpen className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 mb-4">
                You haven't posted any tuitions yet
              </p>
              <Link to="/dashboard/tuitions/new" className="btn btn-primary">
                Post Your First Tuition
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((tuition) => (
              <div
                key={tuition.id}
                className="card bg-white shadow-sm border border-slate-200 hover:shadow-md transition"
              >
                <div className="card-body">
                  <h2 className="card-title text-lg line-clamp-2">
                    {tuition.title}
                  </h2>

                  <p className="text-sm text-slate-600 line-clamp-2">
                    {tuition.description}
                  </p>

                  <div className="flex flex-wrap gap-2 my-3">
                    <span className="badge badge-outline text-xs">
                      {tuition.subject}
                    </span>
                    <span className="badge badge-outline text-xs">
                      {tuition.class_level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`badge badge-sm ${
                          tuition.availability ? "badge-success" : "badge-error"
                        }`}
                      >
                        {tuition.availability ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(tuition.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="card-actions justify-end gap-2 mt-4">
                    <Link
                      to={`/dashboard/tuitions/${tuition.id}/edit`}
                      className="btn btn-ghost btn-sm gap-1"
                    >
                      <FiEdit2 className="h-3 w-3" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(tuition.id)}
                      className="btn btn-ghost btn-sm gap-1 text-error"
                      disabled={deleting === tuition.id}
                    >
                      {deleting === tuition.id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <FiTrash2 className="h-3 w-3" />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTuitions;
