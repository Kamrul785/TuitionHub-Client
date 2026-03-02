import React from "react";

const StarRating = ({ rating, onRatingChange, interactive = false, size = "text-xl" }) => {
  const renderStars = () =>
    Array.from({ length: 5 }).map((_, index) => {
      if (interactive) {
        return (
          <button
            key={index}
            type="button"
            onClick={() => onRatingChange(index + 1)}
            className={`${size} transition-all duration-150 ${
              index < rating ? "text-amber-400" : "text-slate-200"
            } hover:scale-110 hover:text-amber-400 focus:outline-none`}
          >
            ★
          </button>
        );
      }

      return (
        <span
          key={index}
          className={`text-sm ${index < rating ? "text-amber-400" : "text-slate-200"}`}
        >
          ★
        </span>
      );
    });

  return <div className="flex gap-0.5">{renderStars()}</div>;
};

export default StarRating;
