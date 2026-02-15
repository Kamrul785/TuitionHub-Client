import React from "react";
import { FiTrendingUp } from "react-icons/fi";

const OverallProgressCards = ({ overallProgress, stats, enrollments }) => {
  return (
    <div>
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Overall Progress
          </h2>
          <FiTrendingUp className="text-3xl text-blue-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Overall Percentage */}
          <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4 border border-blue-200">
            <p className="text-sm text-slate-600 mb-1">Overall Completion</p>
            <p className="text-3xl font-bold text-blue-600">
              {overallProgress}%
            </p>
          </div>
          {/* Assignments Stats */}
          <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4 border border-green-200">
            <p className="text-sm text-slate-600 mb-1">Assignments</p>
            <p className="text-3xl font-bold text-green-600">
              {stats.completedAssignments}/{stats.totalAssignments}
            </p>
            <p className="text-xs text-slate-600 mt-1">Completed</p>
          </div>

          {/* Topics Stats */}
          <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4 border border-purple-200">
            <p className="text-sm text-slate-600 mb-1">Topics</p>
            <p className="text-3xl font-bold text-purple-600">
              {stats.completedTopics}/{stats.totalTopics}
            </p>
            <p className="text-xs text-slate-600 mt-1">Covered</p>
          </div>

          {/* Active Enrollments */}
          <div className="rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 p-4 border border-orange-200">
            <p className="text-sm text-slate-600 mb-1">Enrollments</p>
            <p className="text-3xl font-bold text-orange-600">
              {enrollments.length}
            </p>
            <p className="text-xs text-slate-600 mt-1">Active</p>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OverallProgressCards;
