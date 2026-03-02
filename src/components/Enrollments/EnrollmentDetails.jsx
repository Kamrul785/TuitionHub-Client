import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { FiArrowLeft, FiClipboard, FiBookOpen } from "react-icons/fi";

const EnrollmentDetails = () => {
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
    if (id) loadEnrollment();
  }, [fetchEnrollmentById, id]);

  const formatDate = (isoString) => isoString ? new Date(isoString).toLocaleString() : "-";

  const InfoCell = ({ label, value }) => (
    <div className="p-4 bg-slate-50 rounded-lg">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );

  return (
    <div className="section-container">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/dashboard/enrollment" className="text-slate-400 hover:text-slate-600 transition-colors">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Enrollment Details</h1>
            <p className="text-sm text-slate-500">Review enrollment info and manage assignments or topics.</p>
          </div>
        </div>

        <div className="card-modern p-6 sm:p-8">
          {loading ? (
            <div className="space-y-4">
              <div className="skeleton-pulse h-6 w-48 rounded"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => <div key={i} className="skeleton-pulse h-20 rounded-lg"></div>)}
              </div>
            </div>
          ) : error ? (
            <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</div>
          ) : enrollment ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoCell label="Tuition" value={enrollment.tuition_title} />
                <InfoCell label="Student" value={enrollment.student_email} />
                <InfoCell label="Enrolled On" value={formatDate(enrollment.enrolled_at)} />
                <InfoCell label="Enrollment ID" value={`#${enrollment.id}`} />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link to={`/dashboard/enrollment/${id}/assignments`}
                  className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none gap-2 text-sm">
                  <FiClipboard className="w-4 h-4" /> Manage Assignments
                </Link>
                <Link to={`/dashboard/enrollment/${id}/topics`}
                  className="btn btn-ghost gap-2 text-sm text-slate-600">
                  <FiBookOpen className="w-4 h-4" /> Manage Topics
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 text-center py-8">Enrollment not found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentDetails;
