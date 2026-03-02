import React from "react";
import { FiTrendingUp, FiCheckSquare, FiBookOpen, FiUsers } from "react-icons/fi";

const StatItem = ({ icon: Icon, label, value, sub, color }) => (
  <div className={`rounded-xl bg-${color}-50 p-4 border border-${color}-100`}>
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`h-4 w-4 text-${color}-600`} />
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
    {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
  </div>
);

const OverallProgressCards = ({ overallProgress, stats, enrollments }) => {
  return (
    <div className="card-modern p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Overall Progress</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600">
          <FiTrendingUp className="h-4 w-4" />
          <span className="text-sm font-semibold">{overallProgress}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatItem icon={FiTrendingUp} label="Completion" value={`${overallProgress}%`} color="indigo" />
        <StatItem icon={FiCheckSquare} label="Assignments" value={`${stats.completedAssignments}/${stats.totalAssignments}`} sub="Completed" color="emerald" />
        <StatItem icon={FiBookOpen} label="Topics" value={`${stats.completedTopics}/${stats.totalTopics}`} sub="Covered" color="violet" />
        <StatItem icon={FiUsers} label="Enrollments" value={enrollments.length} sub="Active" color="amber" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Overall completion</span>
          <span className="text-xs font-semibold text-slate-700">{overallProgress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverallProgressCards;
