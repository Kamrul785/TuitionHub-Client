import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { FiMessageSquare } from "react-icons/fi";

const ReviewSection = ({
  canReview,
  alreadyReviewed,
  rating,
  setRating,
  comment,
  setComment,
  submittingReview,
  reviewsError,
  onSubmitReview,
  reviews,
  reviewsLoading,
  currentUserId,
  onUpdateReview,
  onDeleteReview,
}) => {
  return (
    <div className="mt-8 pt-6 border-t border-slate-100">
      <div className="flex items-center gap-2 mb-5">
        <FiMessageSquare className="w-4 h-4 text-slate-400" />
        <h2 className="text-base font-semibold text-slate-800">Reviews</h2>
        {reviews.length > 0 && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
            {reviews.length}
          </span>
        )}
      </div>

      {reviewsError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 mb-4">{reviewsError}</div>
      )}

      {canReview && !alreadyReviewed ? (
        <ReviewForm
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          submittingReview={submittingReview}
          onSubmit={onSubmitReview}
        />
      ) : (
        <p className="text-sm text-slate-400 mb-5">
          {alreadyReviewed
            ? "You have already reviewed this tuition."
            : "Only enrolled students can submit a review."}
        </p>
      )}

      <ReviewList
        reviews={reviews}
        loading={reviewsLoading}
        currentUserId={currentUserId}
        onUpdate={onUpdateReview}
        onDelete={onDeleteReview}
      />
    </div>
  );
};

export default ReviewSection;
