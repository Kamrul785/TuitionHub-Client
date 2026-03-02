import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { FiEdit2, FiTrash2, FiPlus, FiBookOpen } from "react-icons/fi";
import useAuthContext from "../../hooks/useAuthContext";
import { useToast } from "../ui/Toast";
import { TuitionCardSkeleton } from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import SectionHeader from "../ui/SectionHeader";

const MyTuitions = () => {
  const { user, fetchTuitions, deleteTuition } = useAuthContext();
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const toast = useToast();

  const fetchTuitionsData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all pages since the API is paginated
      let allTuitions = [];
      let url = "/tuitions/";
      while (url) {
        const response = await fetchTuitions(url);
        const data = response.results || response || [];
        allTuitions = [...allTuitions, ...data];
        url = response.next
          ? response.next.replace(/^https?:\/\/[^/]+\/api\/v1/, "")
          : null;
      }
      const myTuitions = allTuitions.filter(
        (tuition) => tuition.tutor_email === user?.email,
      );
      setTuitions(myTuitions);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch tuitions");
    } finally {
      setLoading(false);
    }
  }, [fetchTuitions, user?.email]);

  useEffect(() => {
    if (!user?.email) return;
    fetchTuitionsData();
  }, [fetchTuitionsData, user?.email]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tuition?")) return;

    setDeleting(id);
    try {
      const result = await deleteTuition(id);
      if (result.success) {
        setTuitions(tuitions.filter((t) => t.id !== id));
        toast.success("Tuition deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete tuition");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete tuition");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Tuitions"
        description="Manage your posted tuitions"
        action={
          <Link to="/dashboard/tuitions/new" className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-0 btn-sm gap-2">
            <FiPlus className="w-4 h-4" />
            Add Tuition
          </Link>
        }
      />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => <TuitionCardSkeleton key={i} />)}
        </div>
      ) : tuitions.length === 0 ? (
        <EmptyState
          icon={FiBookOpen}
          title="No tuitions yet"
          description="You haven't posted any tuitions yet. Create your first one!"
          actionLabel="Post Your First Tuition"
          actionTo="/dashboard/tuitions/new"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          {tuitions.map((tuition) => (
            <div key={tuition.id} className="card-modern-interactive p-5 flex flex-col gap-3 shadow-sm rounded-sm">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base font-semibold text-slate-800 line-clamp-2 leading-snug">
                  {tuition.title}
                </h2>
                <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  tuition.availability
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500"
                }`}>
                  {tuition.availability ? "Available" : "Unavailable"}
                </span>
              </div>

              <p className="text-sm text-slate-500 line-clamp-2">{tuition.description}</p>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600">
                  {tuition.subject}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                  {tuition.class_level}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                  tuition.is_paid ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                }`}>
                  {tuition.is_paid ? `${tuition.price} BDT` : "Free"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                <span className="text-xs text-slate-400">
                  {new Date(tuition.created_at).toLocaleDateString()}
                </span>
                <div className="flex gap-1">
                  <Link
                    to={`/dashboard/tuitions/${tuition.id}/edit`}
                    className="btn btn-ghost btn-xs gap-1 text-slate-500 hover:text-indigo-600"
                  >
                    <FiEdit2 className="w-3 h-3" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(tuition.id)}
                    className="btn btn-ghost btn-xs gap-1 text-slate-500 hover:text-red-600"
                    disabled={deleting === tuition.id}
                  >
                    {deleting === tuition.id ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <FiTrash2 className="w-3 h-3" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTuitions;
