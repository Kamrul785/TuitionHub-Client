import { useEffect, useMemo, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import SectionHeader from "../components/ui/SectionHeader";
import { TableSkeleton } from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import { FiMessageSquare, FiStar } from "react-icons/fi";

const Reviews = () => {
  const { user, fetchMyReviews, fetchTutorReviews } = useAuthContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const normalizeList = (data) =>
    Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      setError("");
      const data = user?.role === "Tutor" ? await fetchTutorReviews() : await fetchMyReviews();
      if (data?.success === false) {
        setError(data.message || "Failed to fetch reviews.");
        setReviews([]);
      } else {
        setReviews(normalizeList(data));
      }
      setLoading(false);
    };
    loadReviews();
  }, [user, fetchMyReviews, fetchTutorReviews]);

  const stats = useMemo(() => {
    if (reviews.length === 0) return { avg: 0, total: 0 };
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    return { avg: (sum / total).toFixed(1), total };
  }, [reviews]);

  const renderStars = (value = 0) =>
    Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < value ? "text-amber-400" : "text-slate-200"}>&#9733;</span>
    ));

  const isTutor = user?.role === "Tutor";

  return (
    <div className="section-container">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title={isTutor ? "Tuition Reviews" : "My Reviews"}
          description={isTutor ? "See what students are saying about your tuitions." : "Manage and review your submitted feedback."}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="card-modern p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <FiStar className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Average Rating</p>
                <p className="text-2xl font-bold text-slate-800">{stats.avg}<span className="text-sm text-slate-400 ml-1">/5</span></p>
              </div>
            </div>
          </div>
          <div className="card-modern p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <FiMessageSquare className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Reviews</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-modern">
          <div className="p-6">
            {loading ? (
              <TableSkeleton rows={3} cols={3} />
            ) : error ? (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</div>
            ) : reviews.length === 0 ? (
              <EmptyState
                icon={FiMessageSquare}
                title="No reviews yet"
                description={isTutor ? "No reviews have been submitted for your tuitions." : "You haven't written any reviews yet."}
              />
            ) : (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-lg border border-slate-100 p-4 hover:border-slate-200 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 text-base">{renderStars(Number(review.rating || 0))}
                        <span className="text-xs text-slate-500 ml-1">{review.rating || 0}/5</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {review.created_at ? new Date(review.created_at).toLocaleDateString() : "-"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-3">{review.comment || "No comment provided."}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <span><span className="font-medium text-slate-600">Tuition:</span> {review.tuition_title || review.tuition || "-"}</span>
                      <span><span className="font-medium text-slate-600">Reviewer:</span> {review.student_email || "Anonymous"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
