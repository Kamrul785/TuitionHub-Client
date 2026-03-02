import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { useToast } from "../ui/Toast";
import { TableSkeleton } from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { FiArrowLeft, FiSearch, FiEdit2, FiTrash2, FiBookOpen, FiCheckCircle } from "react-icons/fi";

const EnrollmentTopics = () => {
  const { id } = useParams();
  const { fetchTopics, createTopic, updateTopic, deleteTopic } = useAuthContext();
  const toast = useToast();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ title: "", description: "", completed: false });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      const data = await fetchTopics(id);
      if (data?.success === false) { setError(data.message || "Failed to fetch topics."); setTopics([]); }
      else { setTopics(data?.results || (Array.isArray(data) ? data : [])); }
      setLoading(false);
    };
    if (id) load();
  }, [fetchTopics, id]);

  const filteredTopics = useMemo(() => {
    // Filter by enrollment ID since the API may return all topics
    const enrollmentFiltered = topics.filter(
      (i) => String(i.enrollment) === String(id)
    );
    if (!searchTerm) return enrollmentFiltered;
    const kw = searchTerm.toLowerCase();
    return enrollmentFiltered.filter((i) => (i.title?.toLowerCase() || "").includes(kw) || (i.description?.toLowerCase() || "").includes(kw));
  }, [topics, searchTerm, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => { setFormData({ title: "", description: "", completed: false }); setEditingId(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) { toast.error("Title is required."); return; }
    setSaving(true);
    setError("");
    if (editingId) {
      const updated = await updateTopic(id, editingId, formData);
      if (updated?.success === false) { toast.error(updated.message || "Failed to update."); }
      else { setTopics((prev) => prev.map((i) => (i.id === editingId ? updated : i))); toast.success("Topic updated!"); resetForm(); }
    } else {
      const created = await createTopic(id, formData);
      if (created?.success === false) { toast.error(created.message || "Failed to create."); }
      else { setTopics((prev) => [created, ...prev]); toast.success("Topic created!"); resetForm(); }
    }
    setSaving(false);
  };

  const handleEdit = (t) => { setEditingId(t.id); setFormData({ title: t.title || "", description: t.description || "", completed: t.completed || false }); };

  const handleDelete = async (tid) => {
    if (!window.confirm("Delete this topic?")) return;
    const result = await deleteTopic(id, tid);
    if (result?.success === false) { toast.error(result.message || "Failed to delete."); }
    else { setTopics((prev) => prev.filter((i) => i.id !== tid)); toast.success("Topic deleted!"); }
  };

  const handleToggleComplete = async (topic) => {
    const updated = await updateTopic(id, topic.id, { completed: !topic.completed });
    if (updated?.success === false) { toast.error(updated.message || "Failed to update."); }
    else { setTopics((prev) => prev.map((i) => (i.id === topic.id ? updated : i))); }
  };

  return (
    <div className="section-container">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link to={`/dashboard/enrollment/${id}`} className="text-slate-400 hover:text-slate-600 transition-colors">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Topics</h1>
            <p className="text-sm text-slate-500">Create and manage topics for this enrollment.</p>
          </div>
        </div>

        <div className="card-modern p-6 mb-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">{editingId ? "Edit Topic" : "Add Topic"}</h2>
          {error && <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="title" placeholder="Topic title" className="input input-bordered w-full"
              value={formData.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Description (optional)" className="textarea textarea-bordered w-full" rows={3}
              value={formData.description} onChange={handleChange} />
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
              <input type="checkbox" name="completed" className="checkbox checkbox-sm" checked={formData.completed} onChange={handleChange} />
              Mark as completed
            </label>
            <div className="flex gap-2">
              <button type="submit" disabled={saving}
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none text-sm">
                {saving ? "Saving..." : editingId ? "Update" : "Add Topic"}
              </button>
              {editingId && <button type="button" onClick={resetForm} className="btn btn-ghost text-sm">Cancel</button>}
            </div>
          </form>
        </div>

        <div className="card-modern">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <h2 className="text-base font-semibold text-slate-800">Topic List</h2>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search..." className="input input-bordered input-sm pl-9 w-full md:w-60"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            {loading ? <TableSkeleton rows={3} cols={3} /> : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead><tr><th>Title</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {filteredTopics.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                        <td>
                          <div className="font-medium text-slate-800 text-sm">{t.title}</div>
                          {t.description && <div className="text-xs text-slate-500 mt-0.5">{t.description}</div>}
                        </td>
                        <td>
                          <button onClick={() => handleToggleComplete(t)}
                            className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                              t.completed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                            }`}>
                            {t.completed && <FiCheckCircle className="w-3 h-3" />}
                            {t.completed ? "Completed" : "Pending"}
                          </button>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(t)} className="text-slate-400 hover:text-indigo-600 transition-colors"><FiEdit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(t.id)} className="text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredTopics.length === 0 && <EmptyState icon={FiBookOpen} title="No topics" description="No topics found." />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentTopics;
