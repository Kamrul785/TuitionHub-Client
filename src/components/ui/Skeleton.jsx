/**
 * Skeleton loading component for smooth loading states.
 * Replaces raw spinners with content-shaped placeholders.
 */

const Skeleton = ({ className = "", variant = "text", count = 1 }) => {
  const base = "skeleton-pulse";

  const variants = {
    text: "h-4 w-full",
    title: "h-6 w-3/4",
    avatar: "h-10 w-10 rounded-full",
    card: "h-32 w-full",
    stat: "h-24 w-full",
    button: "h-10 w-28",
    thumbnail: "h-48 w-full",
  };

  const elements = Array.from({ length: count }, (_, i) => (
    <div key={i} className={`${base} ${variants[variant] || ""} ${className}`} />
  ));

  return count === 1 ? elements[0] : <div className="space-y-3">{elements}</div>;
};

/**
 * Pre-built skeleton for a stat card grid
 */
export const StatCardSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: 4 }, (_, i) => (
      <div key={i} className="card-modern p-5">
        <div className="space-y-3">
          <Skeleton variant="text" className="w-20 h-3" />
          <Skeleton variant="title" className="w-16 h-8" />
          <Skeleton variant="text" className="w-24 h-3" />
        </div>
      </div>
    ))}
  </div>
);

/**
 * Pre-built skeleton for a tuition card grid
 */
export const TuitionCardSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="card-modern p-5">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton variant="title" className="w-2/3 h-5" />
            <Skeleton variant="button" className="w-14 h-5" />
          </div>
          <Skeleton variant="text" count={2} />
          <div className="flex gap-2">
            <Skeleton variant="button" className="w-16 h-6" />
            <Skeleton variant="button" className="w-20 h-6" />
          </div>
          <div className="flex justify-between items-center">
            <Skeleton variant="text" className="w-20 h-3" />
            <Skeleton variant="button" className="w-24 h-8" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

/**
 * Pre-built skeleton for a table
 */
export const TableSkeleton = ({ rows = 5, cols = 5 }) => (
  <div className="space-y-3 p-4">
    <div className="flex gap-4">
      {Array.from({ length: cols }, (_, i) => (
        <Skeleton key={i} variant="text" className="flex-1 h-3" />
      ))}
    </div>
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className="flex gap-4">
        {Array.from({ length: cols }, (_, j) => (
          <Skeleton key={j} variant="text" className="flex-1 h-4" />
        ))}
      </div>
    ))}
  </div>
);

export default Skeleton;
