import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const StudentApplicationsList = ({ applications }) => {
  const formatDate = (isoString) => {
    if (!isoString) return "-";
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
  return (
    <div className="card-body">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          My Applications
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-slate-50">
            <tr>
              <th>Tuition</th>
              <th>Status</th>
              <th>Applied On</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="font-medium text-slate-800">
                  {item.tuition_title}
                </td>
                <td>{getStatusChip(item.status)}</td>
                <td className="text-slate-500 text-sm">
                  {formatDate(item.applied_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applications.length === 0 && (
          <div className="text-center text-slate-500 py-6">
            You have not applied to any tuition yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentApplicationsList;
