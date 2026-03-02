import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { TableSkeleton } from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { FiArrowLeft, FiSearch, FiClipboard } from "react-icons/fi";

const StudentEnrollmentAssignments = () => {
  const { id } = useParams();
  const { fetchAssignments } = useAuthContext();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError("");
      const data = await fetchAssignments(id);
      if (data?.success === false) { setError(data.message || "Failed to fetch assignments."); setAssignments([]); }
      else { setAssignments(data?.results || (Array.isArray(data) ? data : [])); }
      setLoading(false);
    };
    if (id) load();
  }, [fetchAssignments, id]);

  const filteredAssignments = useMemo(() => {
    // Filter by enrollment ID since the API may return all assignments
    const enrollmentFiltered = assignments.filter(
      (i) => String(i.enrollment) === String(id)
    );
    if (!searchTerm) return enrollmentFiltered;
    const kw = searchTerm.toLowerCase();
    return enrollmentFiltered.filter((i) => (i.title?.toLowerCase() || "").includes(kw) || (i.description?.toLowerCase() || "").includes(kw));
  }, [assignments, searchTerm, id]);

  return (
    <div className="section-container">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link to={`/dashboard/my-enrollments/${id}`} className="text-slate-400 hover:text-slate-600 transition-colors">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Assignments</h1>
            <p className="text-sm text-slate-500">View assignments for this enrollment.</p>
          </div>
        </div>

        <div className="card-modern">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <h2 className="text-base font-semibold text-slate-800">Assignment List</h2>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search..." className="input input-bordered input-sm pl-9 w-full md:w-60"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            {loading ? <TableSkeleton rows={3} cols={2} /> : error ? (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead><tr><th>Title</th><th>Due Date</th></tr></thead>
                  <tbody>
                    {filteredAssignments.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td>
                          <div className="font-medium text-slate-800 text-sm">{a.title}</div>
                          {a.description && <div className="text-xs text-slate-500 mt-0.5">{a.description}</div>}
                        </td>
                        <td className="text-slate-500 text-xs">{a.due_date || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredAssignments.length === 0 && <EmptyState icon={FiClipboard} title="No assignments" description="No assignments found." />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollmentAssignments;
