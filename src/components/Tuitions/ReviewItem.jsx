import React, { useState } from "react";
import StarRating from "./StarRating";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const ReviewItem = ({ review, currentUserId, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(review.rating);
  const [editedComment, setEditedComment] = useState(review.comment);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = review.student_email === currentUserId;

  const handleSaveEdit = async () => {
    if (!editedRating) return;
    setIsUpdating(true);
    const result = await onUpdate(review.id, {
      rating: Number(editedRating),
      comment: editedComment,
    });
    if (result?.success) {
      setIsEditing(false);
    }
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setIsDeleting(true);
    const result = await onDelete(review.id);
    if (result?.success) {
      alert("Review deleted successfully.");
    }
    setIsDeleting(false);
  };

  if (isEditing) {
    return (
      <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
        <div className="space-y-3">
          <div>
            <label className="label text-sm font-medium">Rating</label>
            <div className="flex items-center gap-2">
              <StarRating
                rating={editedRating}
                onRatingChange={setEditedRating}
                interactive
              />
            </div>
          </div>
          <div>
            <label className="label text-sm font-medium">Comment</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={3}
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            ></textarea>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSaveEdit}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setIsEditing(false)}
              disabled={isUpdating}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <div className="text-lg flex items-center gap-2">
          <StarRating rating={Number(review.rating || 0)} />
        </div>
        <div className="flex gap-2">
          <span className="text-xs text-slate-500">
            {review.created_at
              ? new Date(review.created_at).toLocaleDateString()
              : "-"}
          </span>
        </div>
      </div>
      <p className="text-slate-700">
        {review.comment || "No comment provided."}
      </p>
      <p className="text-xs text-slate-500 mt-2">
        {review.student_email || review.reviewer_email || "Anonymous"}
      </p>
      {isOwner && (
        <div className="flex gap-1 mt-4">
          <button
            className="btn btn-ghost btn-sm text-blue-600 hover:text-blue-700"
            onClick={() => setIsEditing(true)}
            title="Edit review"
          >
            Edit <RiEdit2Fill />
          </button>
          <button
            className="btn btn-ghost btn-sm text-red-600 hover:text-red-700"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete review"
          >
            {isDeleting ? "Deleting..." : <MdDelete className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
