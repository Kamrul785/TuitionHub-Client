import { useState } from "react";
import { FiCheckCircle, FiClock, FiXCircle, FiSearch } from "react-icons/fi";
import useAuthContext from "../../hooks/useAuthContext";
import { useToast } from "../ui/Toast";

const ApplicationHistory = ({ applications, onApplicationUpdate }) => {
  const [loading, setLoading] = useState(null);
  const { selectApplication } = useAuthContext();
  const toast = useToast();

  const formatDate = (isoString) => new Date(isoString).toLocaleString();

  const statusStyles = {
    ACCEPTED: { cls: "status-badge-success", icon: FiCheckCircle, label: "Accepted" },
    REJECTED: { cls: "status-badge-error", icon: FiXCircle, label: "Rejected" },
    PENDING: { cls: "status-badge-warning", icon: FiClock, label: "Pending" },
  };

  const getStatusChip = (status) => {
    const s = statusStyles[status] || statusStyles.PENDING;
    const Icon = s.icon;
    return <span className={`${s.cls} inline-flex items-center gap-1`}><Icon className="w-3 h-3" /> {s.label}</span>;
  };

  const handleSubmit = async (id, tuition) => {
    if (!window.confirm("Are you sure you want to accept this application?")) return;
    setLoading(id);
    try {
      await selectApplication(id, tuition);
      if (onApplicationUpdate) onApplicationUpdate(id, "ACCEPTED");
      toast.success("Application accepted successfully!");
    } catch (error) {
      toast.error("Failed to accept application. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <h2 className="text-base font-semibold text-slate-800">Recent Applications</h2>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by email" className="input input-bordered input-sm pl-9 w-56" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead><tr>
            <th>Tuition</th><th>Applicant</th><th>Status</th><th>Applied</th><th>Action</th>
          </tr></thead>
          <tbody>
            {applications.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="font-medium text-slate-800 text-sm">{item.tuition_title}</td>
                <td className="text-slate-600 text-sm">{item.applicant_email}</td>
                <td>{getStatusChip(item.status)}</td>
                <td className="text-slate-500 text-xs">{formatDate(item.applied_at)}</td>
                <td>
                  {item.status === "PENDING" ? (
                    <button onClick={() => handleSubmit(item.id, item.tuition)} disabled={loading === item.id}
                      className="text-xs font-medium px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50">
                      {loading === item.id ? "Processing..." : "Accept"}
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
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
