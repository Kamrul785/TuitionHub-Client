import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { TableSkeleton } from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { FiArrowLeft, FiSearch, FiBookOpen, FiCheckCircle } from "react-icons/fi";

const StudentEnrollmentTopics = () => {
  const { id } = useParams();
  const { fetchTopics } = useAuthContext();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError("");
      const data = await fetchTopics(id);
      if (data?.success === false) { setError(data.message || "Failed to fetch topics."); setTopics([]); }
      else { setTopics(data?.results || (Array.isArray(data) ? data : [])); }
      setLoading(false);
    };
    if (id) load();
  }, [fetchTopics, id]);

  const filteredTopics = useMemo(() => {
    // Filter by enrollment ID since the API may return all topics
    const enrollmentFiltered = topics.filter(
      (i) => String(i.enrollment) === String(id)
    );
    if (!searchTerm) return enrollmentFiltered;
    const kw = searchTerm.toLowerCase();
    return enrollmentFiltered.filter((i) => (i.title?.toLowerCase() || "").includes(kw) || (i.description?.toLowerCase() || "").includes(kw));
  }, [topics, searchTerm, id]);

  return (
    <div className="section-container">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link to={`/dashboard/my-enrollments/${id}`} className="text-slate-400 hover:text-slate-600 transition-colors">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Topics</h1>
            <p className="text-sm text-slate-500">View topics covered in this enrollment.</p>
          </div>
        </div>

        <div className="card-modern">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <h2 className="text-base font-semibold text-slate-800">Topic List</h2>
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
                  <thead><tr><th>Title</th><th>Status</th></tr></thead>
                  <tbody>
                    {filteredTopics.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                        <td>
                          <div className="font-medium text-slate-800 text-sm">{t.title}</div>
                          {t.description && <div className="text-xs text-slate-500 mt-0.5">{t.description}</div>}
                        </td>
                        <td>
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                            t.completed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          }`}>
                            {t.completed && <FiCheckCircle className="w-3 h-3" />}
                            {t.completed ? "Completed" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredTopics.length === 0 && <EmptyState icon={FiBookOpen} title="No topics" description="No topics found." />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollmentTopics;
