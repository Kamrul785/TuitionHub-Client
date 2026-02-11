import { useState } from "react";
import { Link } from "react-router";
import useFetchTuitions from "../../hooks/FetchTuition";
import ShinyText from "../Animations/ShinyText";
const Tuition = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const { tuitions, loading, error } = useFetchTuitions();

  const subjects = [...new Set(tuitions.map((t) => t.subject))];
  const classes = [...new Set(tuitions.map((t) => t.class_level))];

  const filteredTuitions = tuitions.filter((tuition) => {
    return (
      (tuition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tuition.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterSubject ||
        tuition.subject.toLowerCase().includes(filterSubject.toLowerCase())) &&
      (!filterClass ||
        tuition.class_level.toLowerCase().includes(filterClass.toLowerCase()))
    );
  });

  return (
    <div className="bg-linear-to-b from-blue-50 via-white to-blue-100 min-h-screen">
      {/* Hero Section */}
      <section className="py-10 bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-2">
          <p className="text-3xl uppercase tracking-[0.25em] text-500 font-bold">
            <ShinyText
              text="Browse Tuitions"
              speed={3}
              delay={0.5}
              color="#18181b"
              shineColor="#3b25c1"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover
              disabled={false}
            />
          </p>
          <p className="text-slate-600 max-w-2xl">
            Quickly scan open tuitions and dive into details when you find a
            fit.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search tuition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-md w-full"
            />
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="select select-bordered select-md w-full"
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="select select-bordered select-md w-full"
            >
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterSubject("");
                setFilterClass("");
              }}
              className="btn btn-outline w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Tuitions Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-bold text-blue-600">
                {filteredTuitions.length}
              </span>{" "}
              of <span className="font-bold">{tuitions.length}</span> tuitions
            </p>
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner text-info"></span>
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && filteredTuitions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No tuitions match your filters.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTuitions.map((tuition) => (
              <div
                key={tuition.id}
                className="rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                    {tuition.title}
                  </h3>
                  <span
                    className={`badge badge-sm ${
                      tuition.availability ? "badge-success" : "badge-ghost"
                    }`}
                  >
                    {tuition.availability ? "Open" : "Closed"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                  <span className="badge badge-outline">{tuition.subject}</span>
                  <span className="badge badge-outline">
                    Class {tuition.class_level}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {new Date(tuition.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    to={`/tuitions/${tuition.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tuition;