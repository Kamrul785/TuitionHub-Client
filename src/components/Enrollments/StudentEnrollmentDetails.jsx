import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const StudentEnrollmentDetails = () => {
  const { id } = useParams();
  const { fetchEnrollmentById } = useAuthContext();
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEnrollment = async () => {
      setLoading(true);
      setError("");
      const data = await fetchEnrollmentById(id);

      if (data?.success === false) {
        setError(data.message || "Failed to load enrollment details.");
        setEnrollment(null);
      } else {
        setEnrollment(data);
      }

      setLoading(false);
    };

    if (id) {
      loadEnrollment();
    }
  }, [fetchEnrollmentById, id]);

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Enrollment Details
          </h1>
          <p className="text-slate-600 mt-1">
            Review enrollment information and your learning progress.
          </p>
        </div>

        <div className="card bg-white border border-slate-200 shadow-sm">
          <div className="card-body">
            {loading ? (
              <div className="flex items-center gap-2 text-slate-600">
                <span className="loading loading-spinner loading-sm"></span>
                Loading enrollment...
              </div>
            ) : error ? (
              <div className="alert alert-error text-sm">{error}</div>
            ) : enrollment ? (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Tuition</p>
                    <p className="text-lg font-semibold text-slate-800">
                      {enrollment.tuition_title}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Tutor Email</p>
                    <p className="text-lg font-semibold text-slate-800">
                      {enrollment.tutor_email || "-"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Enrolled On</p>
                    <p className="text-lg font-semibold text-slate-800">
                      {formatDate(enrollment.enrolled_at)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Enrollment ID</p>
                    <p className="text-lg font-semibold text-slate-800">
                      #{enrollment.id}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                  <Link
                    to={`/dashboard/my-enrollments/${id}/assignments`}
                    className="btn btn-primary"
                  >
                    View Assignments
                  </Link>
                  <Link
                    to={`/dashboard/my-enrollments/${id}/topics`}
                    className="btn btn-outline"
                  >
                    View Topics
                  </Link>
                  <Link
                    to="/dashboard/my-enrollments"
                    className="btn btn-ghost"
                  >
                    Back to Enrollments
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-slate-500">Enrollment not found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollmentDetails;
