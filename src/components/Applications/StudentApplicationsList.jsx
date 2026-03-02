import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const StudentApplicationsList = ({ applications }) => {
  const formatDate = (isoString) => isoString ? new Date(isoString).toLocaleString() : "-";

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

  return (
    <div className="p-6">
      <h2 className="text-base font-semibold text-slate-800 mb-5">My Applications</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead><tr>
            <th>Tuition</th><th>Status</th><th>Applied On</th>
          </tr></thead>
          <tbody>
            {applications.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="font-medium text-slate-800 text-sm">{item.tuition_title}</td>
                <td>{getStatusChip(item.status)}</td>
                <td className="text-slate-500 text-xs">{formatDate(item.applied_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {applications.length === 0 && (
          <div className="text-center text-slate-500 py-8 text-sm">You have not applied to any tuition yet.</div>
        )}
      </div>
    </div>
  );
};

export default StudentApplicationsList;
