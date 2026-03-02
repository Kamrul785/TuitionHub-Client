import React from "react";
import ReviewItem from "./ReviewItem";
import Skeleton from "../ui/Skeleton";

const ReviewList = ({ reviews, loading, error, currentUserId, onUpdate, onDelete }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="p-4 rounded-lg border border-slate-100">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">{error}</div>;
  }

  if (reviews.length === 0) {
    return <p className="text-sm text-slate-400">No reviews yet.</p>;
  }

  return (
    <div className="space-y-3">
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
