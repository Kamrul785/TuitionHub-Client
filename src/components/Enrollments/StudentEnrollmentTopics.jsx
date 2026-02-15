import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const StudentEnrollmentTopics = () => {
  const { id } = useParams();
  const { fetchTopics } = useAuthContext();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true);
      setError("");
      const data = await fetchTopics(id);

      if (data?.success === false) {
        setError(data.message || "Failed to fetch topics.");
        setTopics([]);
      } else {
        setTopics(Array.isArray(data) ? data : []);
      }

      setLoading(false);
    };

    if (id) {
      loadTopics();
    }
  }, [fetchTopics, id]);


  // Filter topics by enrollment ID and search term
  const filteredTopics = useMemo(() => {
    const filtered = topics.filter(item => item.enrollment === parseInt(id));
    if (!searchTerm) return filtered;
    const keyword = searchTerm.toLowerCase();
    return filtered.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";
      return title.includes(keyword) || description.includes(keyword);
    });
  }, [topics, searchTerm, id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Topics</h1>
          <p className="text-slate-600 mt-1">
            View topics covered in this enrollment.
          </p>
        </div>

        <div className="card bg-white border border-slate-200 shadow-sm">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Topic List</h2>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Search topics"
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
                Loading topics...
              </div>
            ) : error ? (
              <div className="alert alert-error text-sm">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="bg-slate-50">
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTopics.map((topic) => (
                      <tr key={topic.id} className="hover:bg-slate-50">
                        <td>
                          <div className="font-medium text-slate-800">
                            {topic.title}
                          </div>
                          {topic.description && (
                            <div className="text-sm text-slate-500">
                              {topic.description}
                            </div>
                          )}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              topic.completed
                                ? "badge-success"
                                : "badge-warning"
                            }`}
                          >
                            {topic.completed ? "Completed" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredTopics.length === 0 && (
                  <div className="text-center text-slate-500 py-6">
                    No topics found.
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

export default StudentEnrollmentTopics;
