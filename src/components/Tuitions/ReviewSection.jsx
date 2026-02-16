import React from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

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
    <div className="mt-8 border-t border-slate-200 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Reviews</h2>
      </div>

      {reviewsError && (
        <div className="alert alert-error text-sm mb-4">{reviewsError}</div>
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
        <p className="text-sm text-slate-500 mb-6">
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
