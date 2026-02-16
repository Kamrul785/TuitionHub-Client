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
    <form onSubmit={onSubmit} className="mb-6">
      <div className="space-y-4">
        <div>
          <label className="label text-sm font-medium">Your Rating</label>
          <div className="flex items-center gap-2">
            <StarRating rating={rating} onRatingChange={setRating} interactive />
          </div>
        </div>
        <div>
          <label className="label text-sm font-medium">Comment</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Share your experience with this tuition..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
        </div>
      </div>
      <button
        className="btn btn-primary mt-4"
        type="submit"
        disabled={submittingReview}
      >
        {submittingReview ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
