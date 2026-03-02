import React, { useState } from "react";
import StarRating from "./StarRating";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useToast } from "../ui/Toast";

const ReviewItem = ({ review, currentUserId, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(review.rating);
  const [editedComment, setEditedComment] = useState(review.comment);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();

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
      toast.success("Review updated.");
    }
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setIsDeleting(true);
    const result = await onDelete(review.id);
    if (result?.success) {
      toast.success("Review deleted.");
    }
    setIsDeleting(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 rounded-lg border border-indigo-100 bg-indigo-50/30">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
            <StarRating rating={editedRating} onRatingChange={setEditedRating} interactive />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Comment</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={3}
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-0 btn-sm"
              onClick={handleSaveEdit}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => setIsEditing(false)} disabled={isUpdating}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-slate-500">
              {(review.student_email?.[0] || "A").toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">
              {review.student_email || review.reviewer_email || "Anonymous"}
            </p>
            <div className="flex items-center gap-2">
              <StarRating rating={Number(review.rating || 0)} />
              <span className="text-xs text-slate-400">
                {review.created_at ? new Date(review.created_at).toLocaleDateString() : "-"}
              </span>
            </div>
          </div>
        </div>
        {isOwner && (
          <div className="flex gap-0.5">
            <button
              className="btn btn-ghost btn-xs text-slate-400 hover:text-indigo-600"
              onClick={() => setIsEditing(true)}
              title="Edit review"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
            </button>
            <button
              className="btn btn-ghost btn-xs text-slate-400 hover:text-red-600"
              onClick={handleDelete}
              disabled={isDeleting}
              title="Delete review"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
      <p className="text-sm text-slate-600 ml-11">
        {review.comment || "No comment provided."}
      </p>
    </div>
  );
   
};

export default ReviewItem;
