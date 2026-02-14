import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";

const EnrollmentTopics = () => {
  const { id } = useParams();
  const { fetchTopics, createTopic, updateTopic, deleteTopic } =
    useAuthContext();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true);
      setError("");
      const data = await fetchTopics(id);

      if (data?.success === false) {
        setError(data.message || "Failed to fetch topics.");
        setTopics([]);
      } else {
        setTopics(Array.isArray(data) ? data : []);
      }

      setLoading(false);
    };

    if (id) {
      loadTopics();
    }
  }, [fetchTopics, id]);

  const filteredTopics = useMemo(() => {
    if (!searchTerm) return topics;
    const keyword = searchTerm.toLowerCase();
    return topics.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";
      return title.includes(keyword) || description.includes(keyword);
    });
  }, [topics, searchTerm]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", completed: false });
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
      const updated = await updateTopic(id, editingId, formData);
      if (updated?.success === false) {
        setError(updated.message || "Failed to update topic.");
      } else {
        setTopics((prev) =>
          prev.map((item) => (item.id === editingId ? updated : item)),
        );
        resetForm();
      }
    } else {
      const created = await createTopic(id, formData);
      if (created?.success === false) {
        setError(created.message || "Failed to create topic.");
      } else {
        setTopics((prev) => [created, ...prev]);
        resetForm();
      }
    }

    setSaving(false);
  };

  const handleEdit = (topic) => {
    setEditingId(topic.id);
    setFormData({
      title: topic.title || "",
      description: topic.description || "",
      completed: topic.completed || false,
    });
  };

  const handleDelete = async (topicId) => {
    if (!window.confirm("Delete this topic?")) return;
    const result = await deleteTopic(id, topicId);

    if (result?.success === false) {
      setError(result.message || "Failed to delete topic.");
    } else {
      setTopics((prev) => prev.filter((item) => item.id !== topicId));
    }
  };

  const handleToggleComplete = async (topic) => {
    const updated = await updateTopic(id, topic.id, {
      completed: !topic.completed,
    });

    if (updated?.success === false) {
      setError(updated.message || "Failed to update topic.");
    } else {
      setTopics((prev) =>
        prev.map((item) => (item.id === topic.id ? updated : item)),
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Topics</h1>
          <p className="text-slate-600 mt-1">
            Create and manage topics for this enrollment.
          </p>
        </div>

        <div className="card bg-white border border-slate-200 shadow-sm mb-6">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                {editingId ? "Edit Topic" : "Add Topic"}
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
                placeholder="Topic title"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Topic description"
                className="textarea textarea-bordered w-full"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="completed"
                  className="checkbox"
                  checked={formData.completed}
                  onChange={handleChange}
                />
                <span className="label-text">Mark as completed</span>
              </label>
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-primary" type="submit" disabled={saving}>
                  {saving ? "Saving..." : editingId ? "Update Topic" : "Add Topic"}
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
                Topic List
              </h2>
              <input
                type="text"
                placeholder="Search topics"
                className="input input-bordered input-sm w-full md:w-72"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            {loading ? (
              <div className="flex items-center gap-2 text-slate-600">
                <span className="loading loading-spinner loading-sm"></span>
                Loading topics...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="bg-slate-50">
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTopics.map((topic) => (
                      <tr key={topic.id} className="hover:bg-slate-50">
                        <td>
                          <div className="font-medium text-slate-800">
                            {topic.title}
                          </div>
                          {topic.description && (
                            <div className="text-sm text-slate-500">
                              {topic.description}
                            </div>
                          )}
                        </td>
                        <td>
                          <button
                            className={`badge ${
                              topic.completed
                                ? "badge-success"
                                : "badge-warning"
                            } cursor-pointer`}
                            onClick={() => handleToggleComplete(topic)}
                          >
                            {topic.completed ? "Completed" : "Pending"}
                          </button>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              className="btn btn-outline btn-xs"
                              onClick={() => handleEdit(topic)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-error btn-xs"
                              onClick={() => handleDelete(topic.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredTopics.length === 0 && (
                  <div className="text-center text-slate-500 py-6">
                    No topics found.
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

export default EnrollmentTopics;
