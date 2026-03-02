import React from "react";

const StatCard = ({ icon: Icon, label, value, badge }) => {
  return (
    <div className="card-modern p-5 group">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
          <Icon className="w-[18px] h-[18px] text-indigo-600" />
        </div>
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          {badge}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
      <p className="text-sm text-slate-500 mt-0.5">{label}</p>
    </div>
  );
};

export default StatCard;
