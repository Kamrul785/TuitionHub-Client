import React from "react";
import CountUp from "./CountUp";

const State = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-blue-200/30 blur-2xl" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                🎓
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  <CountUp
                    from={0}
                    to={44886}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    startCounting
                  />
                </div>
                <div className="text-sm text-gray-600">Registered Tutors</div>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-emerald-200/30 blur-2xl" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
                📨
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  <CountUp
                    from={0}
                    to={57890}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    startCounting
                  />
                </div>
                <div className="text-sm text-gray-600">Total Applications</div>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-purple-200/30 blur-2xl" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-purple-600 text-white">
                📚
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  <CountUp
                    from={0}
                    to={1946}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    startCounting
                  />
                </div>
                <div className="text-sm text-gray-600">Live Tuition Jobs</div>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-orange-200/30 blur-2xl" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-orange-600 text-white">
                🤝
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  <CountUp
                    from={0}
                    to={367452}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                    startCounting
                  />
                </div>
                <div className="text-sm text-gray-600">Total Stakeholders</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default State;
