import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/Applications/Card";
import ApplicationHistory from "../components/Applications/ApplicationHistory";
import StudentApplicationsList from "../components/Applications/StudentApplicationsList";
import useAuthContext from "../hooks/useAuthContext";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const { user, fetchApplications } = useAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      setLoading(true);
      const res = await fetchApplications();

      if (res?.success === false) {
        setError(res.message || "Failed to fetch applications.");
        setApplications([]);
        setLoading(false);
        return;
      }

      const data = Array.isArray(res)
        ? res
        : Array.isArray(res?.results)
          ? res.results
          : [];
      setApplications(data);
      setLoading(false);
    };
    fetchData();
  }, [user, fetchApplications]);

  const handleApplicationUpdate = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)),
    );
  };

  const stats = useMemo(() => {
    const pending = applications.filter(
      (app) => app.status === "PENDING",
    ).length;
    const accepted = applications.filter(
      (app) => app.status === "ACCEPTED",
    ).length;
    return { pending, accepted };
  }, [applications]);

  const isTutor = user?.role === "Tutor";

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            {isTutor ? "Applications" : "My Applications"}
          </h1>
          <p className="text-slate-600 mt-1">
            {isTutor
              ? "Review and manage applications from students for your tuitions."
              : "View the status of your applications to various tuitions."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Card
            title={isTutor ? "Total Applicants" : "Total Applications"}
            count={applications.length}
          />
          <Card title="Pending" count={stats.pending} />
          <Card title="Accepted" count={stats.accepted} />
        </div>

        {error && <div className="alert alert-error text-sm mb-4">{error}</div>}

        <div className="card bg-white border border-slate-200 shadow-sm">
          {loading ? (
            <div className="flex items-center gap-2 text-slate-600 p-4">
              <span className="loading loading-spinner loading-sm"></span>
              Loading applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="card-body text-center py-12">
              <p className="text-slate-500 mb-4">
                {isTutor
                  ? "No students have applied to your tuitions yet."
                  : "You haven't applied to any tuitions yet."}
              </p>
            </div>
          ) : isTutor ? (
            <ApplicationHistory
              applications={applications}
              onApplicationUpdate={handleApplicationUpdate}
            />
          ) : (
            <StudentApplicationsList applications={applications} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;
