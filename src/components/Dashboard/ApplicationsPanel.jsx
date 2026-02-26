import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";

const ApplicationsPanel = ({ role, activityTitle, activityColumns, applications = [] }) => {
  const [tuitionTutorMap, setTuitionTutorMap] = useState({});
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return { border: "border-warning", text: "text-warning" };
      case "ACCEPTED":
        return { border: "border-success", text: "text-success" };
      case "REJECTED":
        return { border: "border-error", text: "text-error" };
      default:
        return { border: "border-slate-300", text: "text-slate-600" };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchTuitionTutors = async () => {
      try {
        const response = await apiClient.get("/tuitions/");
        const tuitions = response.data?.results || response.data || [];
        const map = tuitions.reduce((acc, tuition) => {
          acc[tuition.id] = tuition.tutor_email || "-";
          return acc;
        }, {});
        setTuitionTutorMap(map);
      } catch (error) {
        setTuitionTutorMap({});
      }
    };

    fetchTuitionTutors();
  }, []);

  return (
    <div className="mt-6 card bg-white/90 backdrop-blur shadow-sm border border-slate-200">
      <div className="card-body">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Recent Activity
            </p>
            <h3 className="card-title text-lg">{activityTitle}</h3>
          </div>
          <div className="join join-horizontal">
            <button className="btn btn-ghost btn-sm join-item">
              Last 30 days
            </button>
            <button className="btn btn-outline btn-sm join-item">
              Quarter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-slate-500 text-xs uppercase">
              <tr>
                {activityColumns.map((col) => (
                  <th key={col} className="bg-slate-50">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications && applications.length > 0 ? (
                applications.map((app) => {
                  const statusColor = getStatusColor(app.status);
                  return (
                    <tr key={app.id} className="hover:bg-slate-50">
                      {role === "Tutor" ? (
                        <>
                          <td className="font-semibold">#{app.id}</td>
                          <td>{app.applicant_email  || "-"}</td>
                          <td>{app.tuition_title ||  "-"}</td>
                          <td>
                            <div
                              className={`border ${statusColor.border} w-fit rounded-full px-3 py-1 text-center text-sm font-medium ${statusColor.text}`}
                            >
                              {app.status || "-"}
                            </div>
                          </td>
                          <td>{formatDate(app.applied_at)}</td>
                        </>
                      ) : (
                        <>
                          <td className="font-semibold">#{app.id}</td>
                          <td>{app.tuition_title ||  "-"}</td>
                          <td>
                            {typeof app.tuition === "object"
                              ? app.tuition?.tutor_email || "-"
                              : tuitionTutorMap[app.tuition] || "-"}
                          </td>
                          <td>
                            <div
                              className={`border ${statusColor.border} w-fit rounded-full px-3 py-1 text-center text-sm font-medium ${statusColor.text}`}
                            >
                              {app.status || "-"}
                            </div>
                          </td>
                          <td>{formatDate(app.applied_at)}</td>
                        </>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={activityColumns.length} className="text-center text-slate-500 py-8">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPanel;
