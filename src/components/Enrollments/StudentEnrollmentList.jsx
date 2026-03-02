import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import SectionHeader from "../ui/SectionHeader";
import { TableSkeleton } from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { FiSearch, FiBookOpen, FiExternalLink } from "react-icons/fi";

const StudentEnrollmentList = () => {
  const { fetchEnrollments } = useAuthContext();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      const data = await fetchEnrollments();
      if (data?.success === false) { setError(data.message || "Failed to fetch enrollments."); setEnrollments([]); }
      else { setEnrollments(Array.isArray(data) ? data : []); }
      setLoading(false);
    };
    load();
  }, [fetchEnrollments]);

  const filteredEnrollments = useMemo(() => {
    if (!searchTerm) return enrollments;
    const kw = searchTerm.toLowerCase();
    return enrollments.filter((i) => (i.tuition_title?.toLowerCase() || "").includes(kw) || (i.tutor_email?.toLowerCase() || "").includes(kw));
  }, [enrollments, searchTerm]);

  const formatDate = (s) => s ? new Date(s).toLocaleString() : "-";

  const getPaymentStatus = (item) => {
    if (item?.is_paid === false) return { label: "Free", cls: "status-badge-success" };
    if (item?.is_paid === true && item?.payment_verified === true) return { label: "Paid", cls: "bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full" };
    return { label: "Not Paid", cls: "status-badge-warning" };
  };

  return (
    <div className="section-container">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="My Enrollments" description="View the tuitions you are enrolled in." />

        <div className="card-modern">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <h2 className="text-base font-semibold text-slate-800">Enrollment List</h2>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search by tuition or tutor"
                  className="input input-bordered input-sm pl-9 w-full md:w-72"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            {loading ? <TableSkeleton rows={4} cols={4} /> : error ? (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead><tr>
                    <th>Tuition</th><th>Enrolled On</th><th>Payment</th><th></th>
                  </tr></thead>
                  <tbody>
                    {filteredEnrollments.map((item) => {
                      const ps = getPaymentStatus(item);
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="font-medium text-slate-800 text-sm">{item.tuition_title}</td>
                          <td className="text-slate-500 text-xs">{formatDate(item.enrolled_at)}</td>
                          <td><span className={ps.cls}>{ps.label}</span></td>
                          <td>
                            <Link to={`/dashboard/my-enrollments/${item.id}`}
                              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
                              Details <FiExternalLink className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredEnrollments.length === 0 && <EmptyState icon={FiBookOpen} title="No enrollments" description="No enrollments found." />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollmentList;
