import React from "react";

const statusStyles = {
  PENDING: "status-badge-warning",
  ACCEPTED: "status-badge-success",
  REJECTED: "status-badge-error",
};

const ApplicationsPanel = ({ role, activityTitle, activityColumns, applications = [], tuitionTutorMap = {} }) => {

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="card-modern overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-800">{activityTitle}</h3>
            <p className="text-sm text-slate-400 mt-0.5">Most recent activity</p>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {activityColumns.map((col) => (
                <th key={col} className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-50/60 py-3">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications && applications.length > 0 ? (
              applications.map((app) => {
                const badgeClass = statusStyles[app.status?.toUpperCase()] || "status-badge-default";
                return (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    {role === "Tutor" ? (
                      <>
                        <td className="font-medium text-slate-800">#{app.id}</td>
                        <td className="text-slate-600">{app.applicant_email || "-"}</td>
                        <td className="text-slate-600">{app.tuition_title || "-"}</td>
                        <td>
                          <span className={badgeClass}>{app.status || "-"}</span>
                        </td>
                        <td className="text-slate-500 text-sm">{formatDate(app.applied_at)}</td>
                      </>
                    ) : (
                      <>
                        <td className="font-medium text-slate-800">#{app.id}</td>
                        <td className="text-slate-600">{app.tuition_title || "-"}</td>
                        <td className="text-slate-600">
                          {typeof app.tuition === "object"
                            ? app.tuition?.tutor_email || "-"
                            : tuitionTutorMap[app.tuition] || "-"}
                        </td>
                        <td>
                          <span className={badgeClass}>{app.status || "-"}</span>
                        </td>
                        <td className="text-slate-500 text-sm">{formatDate(app.applied_at)}</td>
                      </>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={activityColumns.length} className="text-center text-slate-400 py-12">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsPanel;
