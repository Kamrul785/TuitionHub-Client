import { useEffect, useMemo, useState } from "react";
import Card from "../components/Applications/Card";
import ApplicationHistory from "../components/Applications/ApplicationHistory";
import StudentApplicationsList from "../components/Applications/StudentApplicationsList";
import useAuthContext from "../hooks/useAuthContext";
import SectionHeader from "../components/ui/SectionHeader";
import { TableSkeleton } from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import { FiInbox } from "react-icons/fi";

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
    const pending = applications.filter((app) => app.status === "PENDING").length;
    const accepted = applications.filter((app) => app.status === "ACCEPTED").length;
    return { pending, accepted };
  }, [applications]);

  const isTutor = user?.role === "Tutor";

  return (
    <div className="section-container">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title={isTutor ? "Applications" : "My Applications"}
          description={
            isTutor
              ? "Review and manage applications from students for your tuitions."
              : "View the status of your applications to various tuitions."
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card title={isTutor ? "Total Applicants" : "Total Applications"} count={applications.length} />
          <Card title="Pending" count={stats.pending} />
          <Card title="Accepted" count={stats.accepted} />
        </div>

        {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">{error}</div>}

        <div className="card-modern">
          {loading ? (
            <div className="p-6"><TableSkeleton rows={4} cols={4} /></div>
          ) : applications.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={FiInbox}
                title="No applications yet"
                description={
                  isTutor
                    ? "No students have applied to your tuitions yet."
                    : "You haven't applied to any tuitions yet."
                }
                actionTo="/tuitions"
                actionLabel="Browse Tuitions"
              />
            </div>
          ) : isTutor ? (
            <ApplicationHistory applications={applications} onApplicationUpdate={handleApplicationUpdate} />
          ) : (
            <StudentApplicationsList applications={applications} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;
