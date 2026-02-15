import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const StudentEnrollmentList = () => {
  const { fetchEnrollments } = useAuthContext();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadEnrollments = async () => {
      setLoading(true);
      setError("");
      const data = await fetchEnrollments();

      if (data?.success === false) {
        setError(data.message || "Failed to fetch enrollments.");
        setEnrollments([]);
      } else {
        console.log("Fetched enrollments:", Array.isArray(data));
        setEnrollments(Array.isArray(data) ? data : []);
      }

      setLoading(false);
    };

    loadEnrollments();
  }, [fetchEnrollments]);

  const filteredEnrollments = useMemo(() => {
    if (!searchTerm) return enrollments;
    const keyword = searchTerm.toLowerCase();
    return enrollments.filter((item) => {
      const title = item.tuition_title?.toLowerCase() || "";
      const tutor = item.tutor_email?.toLowerCase() || "";
      return title.includes(keyword) || tutor.includes(keyword);
    });
  }, [enrollments, searchTerm]);

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">My Enrollments</h1>
          <p className="text-slate-600 mt-1">
            View the tuitions you are enrolled in.
          </p>
        </div>

        <div className="card bg-white border border-slate-200 shadow-sm">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Enrollment List
              </h2>
              <input
                type="text"
                placeholder="Search by tuition or tutor"
                className="input input-bordered input-sm w-full md:w-72"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </div>

            {loading ? (
              <div className="flex items-center gap-2 text-slate-600">
                <span className="loading loading-spinner loading-sm"></span>
                Loading enrollments...
              </div>
            ) : error ? (
              <div className="alert alert-error text-sm">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="bg-slate-50">
                    <tr>
                      <th>Tuition</th>
                      <th>Enrolled On</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnrollments.map((item) => (    
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="font-medium text-slate-800">
                          {item.tuition_title}
                        </td>
                        <td className="text-slate-500 text-sm">
                          {formatDate(item.enrolled_at)}
                        </td>
                        <td>
                          <Link
                            to={`/dashboard/my-enrollments/${item.id}`}
                            className="btn btn-primary btn-xs"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredEnrollments.length === 0 && (
                  <div className="text-center text-slate-500 py-6">
                    No enrollments found.
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

export default StudentEnrollmentList;
