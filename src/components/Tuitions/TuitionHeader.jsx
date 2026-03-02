import React from "react";
import { Link } from "react-router";
import { FiArrowLeft } from "react-icons/fi";

const TuitionHeader = ({ tuition }) => {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/tuitions"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-5"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to tuitions
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          {tuition.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600">
            {tuition.subject}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
            Class {tuition.class_level}
          </span>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${
            tuition.availability ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
          }`}>
            {tuition.availability ? "Open" : "Closed"}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-50 text-slate-400">
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
