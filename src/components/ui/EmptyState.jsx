import { Link } from "react-router";

/**
 * Modern empty state component with consistent styling.
 * Usage: <EmptyState icon={FiBookOpen} title="..." description="..." actionLabel="..." actionTo="..." />
 */
const EmptyState = ({
  icon: Icon,
  title = "Nothing here yet",
  description = "",
  actionLabel,
  actionTo,
  onAction,
}) => {
  return (
    <div className="empty-state py-16">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-slate-400" />
        </div>
      )}
      <h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 max-w-sm mb-5">{description}</p>
      )}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-primary btn-sm">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button onClick={onAction} className="btn btn-primary btn-sm">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
