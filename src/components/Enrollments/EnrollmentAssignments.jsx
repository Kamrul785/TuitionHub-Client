import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { useToast } from "../ui/Toast";
import { TableSkeleton } from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { FiArrowLeft, FiSearch, FiEdit2, FiTrash2, FiClipboard } from "react-icons/fi";

const EnrollmentAssignments = () => {
  const { id } = useParams();
  const { fetchAssignments, createAssignment, updateAssignment, deleteAssignment } = useAuthContext();
  const toast = useToast();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ title: "", description: "", due_date: "" });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      const data = await fetchAssignments(id);
      if (data?.success === false) { setError(data.message || "Failed to fetch assignments."); setAssignments([]); }
      else { setAssignments(data?.results || (Array.isArray(data) ? data : [])); }
      setLoading(false);
    };
    if (id) load();
  }, [fetchAssignments, id]);

  const filteredAssignments = useMemo(() => {
    // Filter by enrollment ID since the API may return all assignments
    const enrollmentFiltered = assignments.filter(
      (i) => String(i.enrollment) === String(id)
    );
    if (!searchTerm) return enrollmentFiltered;
    const kw = searchTerm.toLowerCase();
    return enrollmentFiltered.filter((i) => (i.title?.toLowerCase() || "").includes(kw) || (i.description?.toLowerCase() || "").includes(kw));
  }, [assignments, searchTerm, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => { setFormData({ title: "", description: "", due_date: "" }); setEditingId(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) { toast.error("Title is required."); return; }
    setSaving(true);
    setError("");
    if (editingId) {
      const updated = await updateAssignment(id, editingId, formData);
      if (updated?.success === false) { toast.error(updated.message || "Failed to update."); }
      else { setAssignments((prev) => prev.map((i) => (i.id === editingId ? updated : i))); toast.success("Assignment updated!"); resetForm(); }
    } else {
      const created = await createAssignment(id, formData);
      if (created?.success === false) { toast.error(created.message || "Failed to create."); }
      else { setAssignments((prev) => [created, ...prev]); toast.success("Assignment created!"); resetForm(); }
    }
    setSaving(false);
  };

  const handleEdit = (a) => { setEditingId(a.id); setFormData({ title: a.title || "", description: a.description || "", due_date: a.due_date || "" }); };

  const handleDelete = async (aid) => {
    if (!window.confirm("Delete this assignment?")) return;
    const result = await deleteAssignment(id, aid);
    if (result?.success === false) { toast.error(result.message || "Failed to delete."); }
    else { setAssignments((prev) => prev.filter((i) => i.id !== aid)); toast.success("Assignment deleted!"); }
  };

  return (
    <div className="section-container">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link to={`/dashboard/enrollment/${id}`} className="text-slate-400 hover:text-slate-600 transition-colors">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Assignments</h1>
            <p className="text-sm text-slate-500">Create and manage assignments for this enrollment.</p>
          </div>
        </div>

        <div className="card-modern p-6 mb-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">{editingId ? "Edit Assignment" : "Add Assignment"}</h2>
          {error && <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="title" placeholder="Assignment title" className="input input-bordered w-full"
              value={formData.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Description (optional)" className="textarea textarea-bordered w-full" rows={3}
              value={formData.description} onChange={handleChange} />
            <input type="date" name="due_date" className="input input-bordered w-full md:w-60"
              value={formData.due_date} onChange={handleChange} />
            <div className="flex gap-2">
              <button type="submit" disabled={saving}
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none text-sm">
                {saving ? "Saving..." : editingId ? "Update" : "Add Assignment"}
              </button>
              {editingId && <button type="button" onClick={resetForm} className="btn btn-ghost text-sm">Cancel</button>}
            </div>
          </form>
        </div>

        <div className="card-modern">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <h2 className="text-base font-semibold text-slate-800">Assignment List</h2>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search..." className="input input-bordered input-sm pl-9 w-full md:w-60"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            {loading ? <TableSkeleton rows={3} cols={3} /> : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead><tr><th>Title</th><th>Due Date</th><th></th></tr></thead>
                  <tbody>
                    {filteredAssignments.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td>
                          <div className="font-medium text-slate-800 text-sm">{a.title}</div>
                          {a.description && <div className="text-xs text-slate-500 mt-0.5">{a.description}</div>}
                        </td>
                        <td className="text-slate-500 text-xs">{a.due_date || "-"}</td>
                        <td>
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(a)} className="text-slate-400 hover:text-indigo-600 transition-colors"><FiEdit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(a.id)} className="text-slate-400 hover:text-red-500 transition-colors"><FiTrash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredAssignments.length === 0 && <EmptyState icon={FiClipboard} title="No assignments" description="No assignments found." />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentAssignments;
