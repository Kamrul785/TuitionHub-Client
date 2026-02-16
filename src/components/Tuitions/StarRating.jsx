import React from "react";

const StarRating = ({ rating, onRatingChange, interactive = false, size = "text-4xl" }) => {
  const renderStars = () =>
    Array.from({ length: 5 }).map((_, index) => {
      if (interactive) {
        return (
          <button
            key={index}
            type="button"
            onClick={() => onRatingChange(index + 1)}
            onMouseEnter={(e) => {
              const stars = e.currentTarget.parentElement.querySelectorAll("button");
              stars.forEach((star, i) => {
                star.classList.toggle("text-yellow-400", i <= index);
                star.classList.toggle("text-slate-300", i > index);
              });
            }}
            onMouseLeave={(e) => {
              const stars = e.currentTarget.parentElement.querySelectorAll("button");
              stars.forEach((star, i) => {
                star.classList.toggle("text-yellow-500", i < rating);
                star.classList.toggle("text-slate-300", i >= rating);
              });
            }}
            className={`${size} transition-colors ${
              index < rating ? "text-yellow-500" : "text-slate-300"
            } hover:scale-110 focus:outline-none`}
          >
            ★
          </button>
        );
      }

      return (
        <span
          key={index}
          className={index < rating ? "text-yellow-500" : "text-slate-300"}
        >
          ★
        </span>
      );
    });

  return <div className="flex gap-1">{renderStars()}</div>;
};

export default StarRating;
