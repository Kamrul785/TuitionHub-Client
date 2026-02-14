import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const EnrollmentAssignments = () => {
  const { id } = useParams();
  const {
    fetchAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  } = useAuthContext();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadAssignments = async () => {
      setLoading(true);
      setError("");
      const data = await fetchAssignments(id);

      if (data?.success === false) {
        setError(data.message || "Failed to fetch assignments.");
        setAssignments([]);
      } else {
        setAssignments(Array.isArray(data) ? data : []);
      }

      setLoading(false);
    };

    if (id) {
      loadAssignments();
    }
  }, [fetchAssignments, id]);

  const filteredAssignments = useMemo(() => {
    if (!searchTerm) return assignments;
    const keyword = searchTerm.toLowerCase();
    return assignments.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";
      return title.includes(keyword) || description.includes(keyword);
    });
  }, [assignments, searchTerm]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", due_date: "" });
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Title is required.");
      return;
    }

    setSaving(true);
    setError("");

    if (editingId) {
      const updated = await updateAssignment(id, editingId, formData);
      if (updated?.success === false) {
        setError(updated.message || "Failed to update assignment.");
      } else {
        setAssignments((prev) =>
          prev.map((item) => (item.id === editingId ? updated : item)),
        );
        alert("Assignment updated successfully!");
        resetForm();
      }
    } else {
      const created = await createAssignment(id, formData);
      if (created?.success === false) {
        setError(created.message || "Failed to create assignment.");
      } else {
        setAssignments((prev) => [created, ...prev]);
        resetForm();
      }
    }

    setSaving(false);
  };

  const handleEdit = (assignment) => {
    setEditingId(assignment.id);
    setFormData({
      title: assignment.title || "",
      description: assignment.description || "",
      due_date: assignment.due_date || "",
    });
  };

  const handleDelete = async (assignmentId) => {
    if (!window.confirm("Delete this assignment?")) return;
    const result = await deleteAssignment(id, assignmentId);

    if (result?.success === false) {
      setError(result.message || "Failed to delete assignment.");
    } else {
      setAssignments((prev) => prev.filter((item) => item.id !== assignmentId));
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Assignments</h1>
          <p className="text-slate-600 mt-1">
            Create and manage assignments for this enrollment.
          </p>
        </div>

        <div className="card bg-white border border-slate-200 shadow-sm mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                {editingId ? "Edit Assignment" : "Add Assignment"}
              </h2>
              <Link to={`/dashboard/enrollment/${id}`} className="btn btn-ghost">
                Back to Details
              </Link>
            </div>

            {error && <div className="alert alert-error text-sm mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                type="text"
                name="title"
                placeholder="Assignment title"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Assignment description"
                className="textarea textarea-bordered w-full"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
              <input
                type="date"
                name="due_date"
                className="input input-bordered w-full md:w-60"
                value={formData.due_date}
                onChange={handleChange}
              />
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-primary" type="submit" disabled={saving}>
                  {saving ? "Saving..." : editingId ? "Update Assignment" : "Add Assignment"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="card bg-white border border-slate-200 shadow-sm">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Assignment List
              </h2>
              <input
                type="text"
                placeholder="Search assignments"
                className="input input-bordered input-sm w-full md:w-72"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            {loading ? (
              <div className="flex items-center gap-2 text-slate-600">
                <span className="loading loading-spinner loading-sm"></span>
                Loading assignments...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="bg-slate-50">
                    <tr>
                      <th>Title</th>
                      <th>Due Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssignments.map((assignment) => (
                      <tr key={assignment.id} className="hover:bg-slate-50">
                        <td>
                          <div className="font-medium text-slate-800">
                            {assignment.title}
                          </div>
                          {assignment.description && (
                            <div className="text-sm text-slate-500">
                              {assignment.description}
                            </div>
                          )}
                        </td>
                        <td className="text-slate-500 text-sm">
                          {assignment.due_date || "-"}
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              className="btn btn-outline btn-xs"
                              onClick={() => handleEdit(assignment)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-error btn-xs"
                              onClick={() => handleDelete(assignment.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredAssignments.length === 0 && (
                  <div className="text-center text-slate-500 py-6">
                    No assignments found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentAssignments;
