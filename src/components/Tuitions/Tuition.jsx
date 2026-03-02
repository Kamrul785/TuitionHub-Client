import { useState } from "react";
import { Link } from "react-router";
import useFetchTuitions from "../../hooks/FetchTuition";
import { TuitionCardSkeleton } from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import SectionHeader from "../ui/SectionHeader";
import ShinyText from "../Animations/ShinyText";
import {
  FiSearch,
  FiX,
  FiArrowRight,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Tuition = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { tuitions, loading, error, totalCount, totalPages } =
    useFetchTuitions(currentPage);

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

  const hasActiveFilters = searchTerm || filterSubject || filterClass;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="section-container py-8">
          <SectionHeader
            title={<>Browse <ShinyText text="Tuitions" color="#4f46e5" shineColor="#a5b4fc" speed={3} className="text-indigo-600" /></>}
            description="Quickly scan open tuitions and dive into details when you find a fit."
          />
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-slate-100 sticky top-16 z-30">
        <div className="section-container py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tuitions..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="input input-bordered w-full pl-9"
              />
            </div>
            <select
              value={filterSubject}
              onChange={(e) => {
                setFilterSubject(e.target.value);
                setCurrentPage(1);
              }}
              className="select select-bordered w-full"
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <select
              value={filterClass}
              onChange={(e) => {
                setFilterClass(e.target.value);
                setCurrentPage(1);
              }}
              className="select select-bordered w-full"
            >
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            {hasActiveFilters && (
              <button
                onClick={() => { setSearchTerm(""); setFilterSubject(""); setFilterClass(""); setCurrentPage(1); }}
                className="btn btn-ghost text-slate-500 gap-2"
              >
                <FiX className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-container py-8">
        {!loading && !error && (
          <p className="text-sm text-slate-400 mb-5">
            Showing <span className="font-semibold text-slate-600">{filteredTuitions.length}</span> of {totalCount} tuitions
            {totalPages > 1 && (
              <span className="ml-1">(Page {currentPage} of {totalPages})</span>
            )}
          </p>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <TuitionCardSkeleton key={i} />)}
          </div>
        )}

        {error && (
          <div className="card-modern p-6 text-center">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && filteredTuitions.length === 0 && (
          <EmptyState
            icon={FiBookOpen}
            title="No tuitions found"
            description={hasActiveFilters ? "Try adjusting your filters to find more results." : "No tuitions are available at the moment."}
            actionLabel={hasActiveFilters ? "Clear filters" : undefined}
            onAction={hasActiveFilters ? () => { setSearchTerm(""); setFilterSubject(""); setFilterClass(""); setCurrentPage(1); } : undefined}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {filteredTuitions.map((tuition) => (
            <div
              key={tuition.id}
              className="card-modern-interactive p-5 flex flex-col gap-4 shadow-sm rounded-sm "
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-800 line-clamp-2 leading-snug">
                  {tuition.title}
                </h3>
                <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  tuition.availability
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-400"
                }`}>
                  {tuition.availability ? "Open" : "Closed"}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600">
                  {tuition.subject}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                  Class {tuition.class_level}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                  tuition.is_paid
                    ? "bg-amber-50 text-amber-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}>
                  {tuition.is_paid ? `${tuition.price} BDT` : "Free"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-400">
                  {new Date(tuition.created_at).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                  })}
                </span>
                <Link
                  to={`/tuitions/${tuition.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Details
                  <FiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 my-5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-ghost px-2 disabled:opacity-40"
            >
              <FiChevronLeft className="w-4 h-4" />
            </button>

            {generatePageNumbers(currentPage, totalPages).map((page, i) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="w-9 h-9 flex items-center justify-center text-sm text-slate-400"
                >
                  &hellip;
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`btn btn-sm w-9 h-9 p-0 text-sm font-medium ${
                    page === currentPage
                      ? "btn-primary bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white"
                      : "btn-ghost text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-ghost px-2 disabled:opacity-40"
            >
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

function generatePageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [];
  pages.push(1);

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}

export default Tuition;