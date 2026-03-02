import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import SectionHeader from "../ui/SectionHeader";
import { TableSkeleton } from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { FiSearch, FiUsers, FiExternalLink } from "react-icons/fi";

const EnrollmentList = () => {
  const { fetchEnrollments } = useAuthContext();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadEnrollments = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchEnrollments();
        if (!isMounted) return;
        if (data?.success === false) {
          setError(data.message || "Failed to fetch enrollments.");
          setEnrollments([]);
        } else {
          setEnrollments(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || "Failed to fetch enrollments.");
        setEnrollments([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadEnrollments();
    return () => { isMounted = false; };
  }, [fetchEnrollments]);

  const filteredEnrollments = useMemo(() => {
    if (!searchTerm) return enrollments;
    const keyword = searchTerm.toLowerCase();
    return enrollments.filter((item) => {
      const title = item.tuition_title?.toLowerCase() || "";
      const student = item.student_email?.toLowerCase() || "";
      return title.includes(keyword) || student.includes(keyword);
    });
  }, [enrollments, searchTerm]);

  const formatDate = (isoString) => isoString ? new Date(isoString).toLocaleString() : "-";

  return (
    <div className="section-container">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Enrollments" description="View students enrolled in your tuitions and manage progress." />

        <div className="card-modern">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <h2 className="text-base font-semibold text-slate-800">Enrollment List</h2>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search by student or tuition"
                  className="input input-bordered input-sm pl-9 w-full md:w-72"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            {loading ? (
              <TableSkeleton rows={4} cols={4} />
            ) : error ? (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead><tr>
                    <th>Tuition</th><th>Student</th><th>Enrolled On</th><th></th>
                  </tr></thead>
                  <tbody>
                    {filteredEnrollments.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="font-medium text-slate-800 text-sm">{item.tuition_title}</td>
                        <td className="text-slate-600 text-sm">{item.student_email}</td>
                        <td className="text-slate-500 text-xs">{formatDate(item.enrolled_at)}</td>
                        <td>
                          <Link to={`/dashboard/enrollment/${item.id}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
                            Details <FiExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredEnrollments.length === 0 && (
                  <EmptyState icon={FiUsers} title="No enrollments" description="No enrollments found." />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentList;
