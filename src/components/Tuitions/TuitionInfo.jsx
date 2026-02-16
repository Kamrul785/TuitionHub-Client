import React from "react";

const TuitionInfo = ({ tuition, onApply, applying, canApply, checkApply, applicationStatus }) => {
  const getApplyButtonContent = () => {
    if (!applicationStatus) {
      return applying ? "Applying..." : "Apply";
    }

    const status = applicationStatus.status;
    if (status === "PENDING") {
      return "Application Pending";
    } else if (status === "ACCEPTED") {
      return "Accepted";
    } else if (status === "REJECTED") {
      return "Reapply";
    }
    return "Apply";
  };

  const getApplyButtonClass = () => {
    if (!applicationStatus) {
      return "btn btn-primary";
    }

    const status = applicationStatus.status;
    if (status === "ACCEPTED") {
      return "btn btn-success";
    } else if (status === "REJECTED") {
      return "btn btn-error";
    }
    return "btn btn-warning";
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <p className="text-sm text-slate-500">Tutor</p>
          <p className="font-semibold text-slate-800">{tuition.tutor_email}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-slate-500">Subject</p>
          <p className="font-semibold text-slate-800">{tuition.subject}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-slate-500">Class Level</p>
          <p className="font-semibold text-slate-800">{tuition.class_level}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Description</h2>
        <p className="text-slate-700 leading-relaxed whitespace-pre-line">
          {tuition.description}
        </p>
      </div>

      <button
        className={`${getApplyButtonClass()} mt-6`}
        onClick={onApply}
        disabled={applying || !canApply || checkApply}
      >
        {getApplyButtonContent()}
      </button>
    </div>
  );
};

export default TuitionInfo;
