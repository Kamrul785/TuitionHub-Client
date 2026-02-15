import { FiCheckCircle, FiCircle } from "react-icons/fi";

const EnrollmentProgressCard = ({ enrollment, progress }) => {
  return (
    <div>
      <div className="card-body">
        <h3 className="card-title text-lg text-slate-800">
          {enrollment.tuition_title}
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Tutor: {enrollment.tuition.__tutor_email}
        </p>

        {/* Assignments Progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-green-600" />
              <span className="text-sm font-medium text-slate-700">
                Assignments
              </span>
            </div>
            <span className="text-sm font-bold text-slate-800">
              {progress.assignments.percentage}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${progress.assignments.percentage}%`,
                }}
              ></div>
            </div>
            <span className="text-xs text-slate-600 w-16 text-right">
              {progress.assignments.completed}/{progress.assignments.total}
            </span>
          </div>
        </div>

        {/* Topics Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FiCircle className="text-purple-600" />
              <span className="text-sm font-medium text-slate-700">Topics</span>
            </div>
            <span className="text-sm font-bold text-slate-800">
              {progress.topics.percentage}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${progress.topics.percentage}%`,
                }}
              ></div>
            </div>
            <span className="text-xs text-slate-600 w-16 text-right">
              {progress.topics.completed}/{progress.topics.total}
            </span>
          </div>
        </div>

        {/* Overall Enrollment Progress */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-600">OVERALL</span>
            <span className="text-xs font-bold text-slate-800">
              {Math.round(
                (progress.assignments.percentage + progress.topics.percentage) /
                  2,
              )}
              %
            </span>
          </div>
          <div className="bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.round(
                  (progress.assignments.percentage +
                    progress.topics.percentage) /
                    2,
                )}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentProgressCard;
