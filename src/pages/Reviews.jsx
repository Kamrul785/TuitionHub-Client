import React, { useEffect, useMemo, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

const Reviews = () => {
  const { user, fetchMyReviews, fetchTutorReviews } = useAuthContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const normalizeList = (data) =>
    Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
        ? data.results
        : [];

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      setError("");

      const data =
        user?.role === "Tutor" ? await fetchTutorReviews() : await fetchMyReviews();

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
    const sum = reviews.reduce(
      (acc, review) => acc + Number(review.rating || 0),
      0,
    );
    return { avg: (sum / total).toFixed(1), total };
  }, [reviews]);

  const renderStars = (value = 0) =>
    Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={index < value ? "text-yellow-500" : "text-slate-300"}
      >
        ★
      </span>
    ));

  const heading = user?.role === "Tutor" ? "Tuition Reviews" : "My Reviews";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">{heading}</h1>
          <p className="text-slate-600 mt-1">
            {user?.role === "Tutor"
              ? "See what students are saying about your tuitions."
              : "Manage and review your submitted feedback."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="card bg-white border border-slate-200 shadow-sm">
            <div className="card-body">
              <p className="text-sm text-slate-500">Average Rating</p>
              <div className="text-3xl font-bold text-slate-800">
                {stats.avg}
              </div>
            </div>
          </div>
          <div className="card bg-white border border-slate-200 shadow-sm">
            <div className="card-body">
              <p className="text-sm text-slate-500">Total Reviews</p>
              <div className="text-3xl font-bold text-slate-800">
                {stats.total}
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-white border border-slate-200 shadow-sm">
          <div className="card-body">
            {loading ? (
              <div className="flex items-center gap-2 text-slate-600">
                <span className="loading loading-spinner loading-sm"></span>
                Loading reviews...
              </div>
            ) : error ? (
              <div className="alert alert-error text-sm">{error}</div>
            ) : reviews.length === 0 ? (
              <div className="text-center text-slate-500 py-6">
                No reviews found.
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 text-lg">
                        {renderStars(Number(review.rating || 0))}
                        <span className="text-sm text-slate-600">
                          {review.rating || 0}/5
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {review.created_at
                          ? new Date(review.created_at).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>

                    <p className="text-slate-700 mb-2">
                      {review.comment || "No comment provided."}
                    </p>

                    <div className="text-xs text-slate-500">
                      <span className="font-medium">Tuition:</span>{" "}
                      {review.tuition_title || review.tuition || "-"}
                    </div>
                    <div className="text-xs text-slate-500">
                      <span className="font-medium">Reviewer:</span>{" "}
                      {review.student_email || "Anonymous"}
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
