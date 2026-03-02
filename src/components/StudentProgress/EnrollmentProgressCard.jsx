import { FiCheckSquare, FiBookOpen } from "react-icons/fi";

const ProgressBar = ({ label, icon: Icon, percentage, completed, total, color }) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 text-${color}-600`} />
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
      <span className="text-sm font-semibold text-slate-900">{percentage}%</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-slate-100 rounded-full h-2">
        <div
          className={`bg-${color}-500 h-2 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-slate-500 w-12 text-right tabular-nums">
        {completed}/{total}
      </span>
    </div>
  </div>
);

const EnrollmentProgressCard = ({ enrollment, progress }) => {
  const overall = Math.round(
    (progress.assignments.percentage + progress.topics.percentage) / 2,
  );

  return (
    <div className="card-modern-interactive p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 mb-1">
          {enrollment.tuition_title}
        </h3>
        <p className="text-xs text-slate-500">
          Tutor: {enrollment.tuition_tutor_email || enrollment.tuition?.__tutor_email || "N/A"}
        </p>
      </div>

      <ProgressBar
        label="Assignments"
        icon={FiCheckSquare}
        percentage={progress.assignments.percentage}
        completed={progress.assignments.completed}
        total={progress.assignments.total}
        color="emerald"
      />

      <ProgressBar
        label="Topics"
        icon={FiBookOpen}
        percentage={progress.topics.percentage}
        completed={progress.topics.completed}
        total={progress.topics.total}
        color="violet"
      />

      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Overall</span>
          <span className="text-xs font-bold text-indigo-600">{overall}%</span>
        </div>
        <div className="bg-slate-100 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${overall}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default EnrollmentProgressCard;
