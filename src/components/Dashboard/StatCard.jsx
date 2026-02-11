import React from "react";

const StatCard = ({icon: Icon, label, value, badge, badgeClass}) => {
  return (
    <div
      key={label}
      className="card bg-white/90 backdrop-blur shadow-sm border border-slate-200 hover:-translate-y-0.5 transition-transform"
    >
      <div className="card-body p-4">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-medium">{label}</h3>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <p className="text-2xl font-bold">{value}</p>
          <span className={badgeClass}>{badge}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
