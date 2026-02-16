import React from "react";
import { Link } from "react-router";

const TuitionHeader = ({ tuition }) => {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link to="/tuitions" className="btn btn-ghost btn-md mb-4">
          ← Back
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          {tuition.title}
        </h1>
        <div className="flex flex-wrap gap-2 text-sm text-slate-600">
          <span className="badge badge-outline">{tuition.subject}</span>
          <span className="badge badge-outline">
            Class {tuition.class_level}
          </span>
          <span
            className={`badge ${tuition.availability ? "badge-success" : "badge-ghost"}`}
          >
            {tuition.availability ? "Open" : "Closed"}
          </span>
          <span className="badge badge-outline">
            {new Date(tuition.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </section>
  );
};

export default TuitionHeader;
