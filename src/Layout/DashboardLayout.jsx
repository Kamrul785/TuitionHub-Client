import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import Navbar from "../components/Dashboard/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";
import ApplicationsPanel from "../components/Dashboard/ApplicationsPanel";
import {
  FiBookOpen,
  FiPlusCircle,
  FiShoppingCart,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { Outlet } from "react-router";
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loadingUser } = useAuthContext();
  const role = user?.role;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open bg-linear-to-b from-slate-50 via-white to-slate-50 min-h-screen">
      {/* Mobile drawer checkbox */}
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggleSidebar}
      />

      {/* Page content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen} />

        {/* Main content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <Sidebar role={role} />
    </div>
  );
};

export default DashboardLayout;
