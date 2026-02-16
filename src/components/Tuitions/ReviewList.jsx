import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews, loading, error, currentUserId, onUpdate, onDelete }) => {
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-600">
        <span className="loading loading-spinner loading-sm"></span>
        Loading reviews...
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error text-sm">{error}</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-slate-500">No reviews yet.</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          currentUserId={currentUserId}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ReviewList;
