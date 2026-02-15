import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const StudentEnrollmentAssignments = () => {
  const { id } = useParams();
  const { fetchAssignments } = useAuthContext();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadAssignments = async () => {
      setLoading(true);
      setError("");
      const data = await fetchAssignments(id);

      if (data?.success === false) {
        setError(data.message || "Failed to fetch assignments.");
        setAssignments([]);
      } else {
        // API already returns filtered assignments for this enrollment
        setAssignments(Array.isArray(data) ? data : []);
      }

      setLoading(false);
    };

    if (id) {
      loadAssignments();
    }
  }, [fetchAssignments, id]);


  const filteredAssignments = useMemo(() => {
    // Filter by enrollment ID to show only assignments for this enrollment
    let filtered = assignments.filter(item => item.enrollment === parseInt(id));
    
    // Then apply search filter
    if (!searchTerm) return filtered;
    const keyword = searchTerm.toLowerCase();
    return filtered.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";
      return title.includes(keyword) || description.includes(keyword);
    });
  }, [assignments, searchTerm, id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Assignments</h1>
          <p className="text-slate-600 mt-1">
            View assignments for this enrollment.
          </p>
        </div>

        <div className="card bg-white border border-slate-200 shadow-sm">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Assignment List
              </h2>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Search assignments"
                  className="input input-bordered input-sm w-full md:w-72"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <Link
                  to={`/dashboard/my-enrollments/${id}`}
                  className="btn btn-ghost btn-sm"
                >
                  Back to Details
                </Link>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center gap-2 text-slate-600">
                <span className="loading loading-spinner loading-sm"></span>
                Loading assignments...
              </div>
            ) : error ? (
              <div className="alert alert-error text-sm">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="bg-slate-50">
                    <tr>
                      <th>Title</th>
                      <th>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssignments.map((assignment) => (
                      <tr key={assignment.id} className="hover:bg-slate-50">
                        <td>
                          <div className="font-medium text-slate-800">
                            {assignment.title}
                          </div>
                          {assignment.description && (
                            <div className="text-sm text-slate-500">
                              {assignment.description}
                            </div>
                          )}
                        </td>
                        <td className="text-slate-500 text-sm">
                          {assignment.due_date || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredAssignments.length === 0 && (
                  <div className="text-center text-slate-500 py-6">
                    No assignments found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollmentAssignments;
