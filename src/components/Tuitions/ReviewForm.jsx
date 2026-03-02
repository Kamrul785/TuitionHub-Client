import React from "react";
import StarRating from "./StarRating";

const ReviewForm = ({
  rating,
  setRating,
  comment,
  setComment,
  submittingReview,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="mb-6 p-4 rounded-lg bg-slate-50 border border-slate-100">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Rating</label>
          <StarRating rating={rating} onRatingChange={setRating} interactive />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Comment</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={3}
            placeholder="Share your experience with this tuition..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
      </div>
      <button
        className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-0 btn-sm mt-4"
        type="submit"
        disabled={submittingReview}
      >
        {submittingReview ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
