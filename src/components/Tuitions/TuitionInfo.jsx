import React from "react";
import { FiMail, FiBook, FiLayers, FiDollarSign } from "react-icons/fi";

const TuitionInfo = ({ tuition, onApply, applying, canApply, checkApply, applicationStatus }) => {
  const getApplyButtonContent = () => {
    if (!applicationStatus) return applying ? "Applying..." : "Apply Now";
    const status = applicationStatus.status;
    if (status === "PENDING") return "Application Pending";
    if (status === "ACCEPTED") return "Accepted";
    if (status === "REJECTED") return "Reapply";
    return "Apply Now";
  };

  const getApplyButtonClass = () => {
    if (!applicationStatus) return "btn bg-indigo-600 hover:bg-indigo-700 text-white border-0";
    const status = applicationStatus.status;
    if (status === "ACCEPTED") return "btn bg-emerald-600 text-white border-0 cursor-default";
    if (status === "REJECTED") return "btn bg-red-600 hover:bg-red-700 text-white border-0";
    return "btn bg-amber-500 text-white border-0 cursor-default";
  };

  const infoItems = [
    { icon: FiMail, label: "Tutor", value: tuition.tutor_email },
    { icon: FiBook, label: "Subject", value: tuition.subject },
    { icon: FiLayers, label: "Class Level", value: tuition.class_level },
    {
      icon: FiDollarSign,
      label: "Price",
      value: tuition.is_paid ? `${tuition.price} BDT` : "Free",
      highlight: !tuition.is_paid,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Info grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {infoItems.map(({ icon: Icon, label, value, highlight }) => (
          <div key={label} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 mb-1.5">
              <Icon className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] uppercase tracking-wider font-medium text-slate-400">{label}</span>
            </div>
            <p className={`text-sm font-semibold truncate ${highlight ? "text-emerald-600" : "text-slate-800"}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div>
        <h2 className="text-base font-semibold text-slate-800 mb-2">Description</h2>
        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
          {tuition.description}
        </p>
      </div>

      {/* Apply button */}
      <button
        className={`${getApplyButtonClass()} mt-2`}
        onClick={onApply}
        disabled={applying || !canApply || checkApply}
      >
        {getApplyButtonContent()}
      </button>
    </div>
  );
};

export default TuitionInfo;
