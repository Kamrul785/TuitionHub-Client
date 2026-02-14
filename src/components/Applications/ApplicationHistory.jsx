import React from "react";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import useAuthContext from "../../hooks/useAuthContext";

const ApplicationHistory = ({ applications, onApplicationUpdate }) => {
  const [loading, setLoading] = React.useState(null); // Track which app is loading
  const { selectApplication } = useAuthContext();

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const getStatusChip = (status) => {
    if (status === "ACCEPTED") {
      return (
        <span className="badge badge-success gap-1">
          <FiCheckCircle className="h-3 w-3" /> Accepted
        </span>
      );
    }
    if (status === "REJECTED") {
      return (
        <span className="badge badge-error gap-1">
          <FiXCircle className="h-3 w-3" /> Rejected
        </span>
      );
    }
    return (
      <span className="badge badge-warning gap-1">
        <FiClock className="h-3 w-3" /> Pending
      </span>
    );
  };

  const handleSubmit = async (id, tuition) => {
    // Confirmation dialog
    if (!window.confirm("Are you sure you want to accept this application?")) {
      return;
    }

    setLoading(id);
    try {
      await selectApplication(id, tuition);
      // Notify parent to update the application list
      if (onApplicationUpdate) {
        onApplicationUpdate(id, "ACCEPTED");
      }
      console.log("Application accepted successfully.");
    } catch (error) {
      console.error("Error accepting application:", error);
      alert("Failed to accept application. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="card-body">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Recent Applications
        </h2>
        {/* Table  */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by email"
            className="input input-bordered input-sm w-56"
          />
          <select className="select select-bordered select-sm">
            <option>All</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-slate-50">
            <tr>
              <th>Tuition</th>
              <th>Applicant Email</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="font-medium text-slate-800">
                  {item.tuition_title}
                </td>
                <td className="text-slate-700">{item.applicant_email}</td>
                <td>{getStatusChip(item.status)}</td>
                <td className="text-slate-500 text-sm">
                  {formatDate(item.applied_at)}
                </td>
                <td>
                  {item.status === "PENDING" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSubmit(item.id, item.tuition)}
                        disabled={loading === item.id}
                        className="btn btn-success btn-xs"
                      >
                        {loading === item.id ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Processing
                          </>
                        ) : (
                          "Accept"
                        )}
                      </button>
                      <button className="btn btn-error btn-xs">Reject</button>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-500">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationHistory;
