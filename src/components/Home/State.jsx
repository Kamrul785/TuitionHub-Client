import React from "react";
import { FiUserCheck, FiSend, FiBookOpen, FiUsers } from "react-icons/fi";
import CountUp from "./CountUp";

const stats = [
  { icon: FiUserCheck, to: 44886, label: "Registered Tutors", color: "indigo" },
  { icon: FiSend, to: 57890, label: "Total Applications", color: "emerald" },
  { icon: FiBookOpen, to: 1946, label: "Live Tuition Jobs", color: "violet" },
  { icon: FiUsers, to: 367452, label: "Total Stakeholders", color: "amber" },
];

const State = () => {
  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map(({ icon: Icon, to, label, color }) => (
            <div
              key={label}
              className="card-modern-interactive p-5 sm:p-6 text-center"
            >
              <div className={`w-10 h-10 rounded-xl bg-${color}-50 flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`h-5 w-5 text-${color}-600`} />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                <CountUp
                  from={0}
                  to={to}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                  startCounting
                />
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default State;
