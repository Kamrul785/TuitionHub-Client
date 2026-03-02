import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import Navbar from "../components/Dashboard/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router";
import PageTransition from "../components/ui/PageTransition";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loadingUser } = useAuthContext();
  const role = user?.role;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <span className="loading loading-spinner loading-lg text-indigo-600" />
          <p className="text-sm text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open bg-slate-50 min-h-screen">
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggleSidebar}
      />

      {/* Page content */}
      <div className="drawer-content flex flex-col min-h-screen">
        <Navbar sidebarOpen={sidebarOpen} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

      {/* Sidebar */}
      <Sidebar role={role} />
    </div>
  );
};

export default DashboardLayout;
