import React, { useEffect, useState } from "react";
import Card from "../components/Applications/Card";
import ApplicationHistory from "../components/Applications/ApplicationHistory";
import useAuthContext from "../hooks/useAuthContext";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const { user, fetchApplications } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchApplications();
      console.log(res.results);
      setApplications(res.results);
    };
    fetchData();
  }, [user]);

  const handleApplicationUpdate = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const pending = applications.filter((app) => app.status === "PENDING").length;
  const accepted = applications.filter((app) => app.status === "ACCEPTED").length;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Applications</h1>
          <p className="text-slate-600 mt-1">
            Track applicants and manage their requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Card title="Total Applicants" count={applications.length} />
          <Card title={"Pending"} count={pending} />
          <Card title={"Accepted"} count={accepted} />
        </div>

        <div className="card bg-white border border-slate-200 shadow-sm">
          <ApplicationHistory 
            applications={applications} 
            onApplicationUpdate={handleApplicationUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default Applications;
