import React from "react";

const Card = ({ title, count }) => {
  return (
    <div className="card bg-white border border-slate-200 shadow-sm">
      <div className="card-body">
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{count}</h3>
      </div>
    </div>
  );
};

export default Card;
