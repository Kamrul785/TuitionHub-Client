import React from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { FiBookOpen, FiMenu, FiX, FiUser, FiLogOut, FiGrid, FiHome } from "react-icons/fi";
import { Link } from "react-router";

const Navbar = ({ sidebarOpen }) => {
  const { user, logoutUser } = useAuthContext();

  return (
    <div className="navbar bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm px-4">
      {/* Mobile Sidebar Toggle */}
      <div className="flex-none lg:hidden">
        <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost hover:bg-blue-50">
          {sidebarOpen ? (
            <FiX className="h-5 w-5 text-slate-700" />
          ) : (
            <FiMenu className="h-5 w-5 text-slate-700" />
          )}
        </label>    
      </div>

      {/* Dashboard Title */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ">
            <FiBookOpen className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-medium">
              Overview
            </p>
            <h2 className="text-lg font-bold text-slate-900">
              Dashboard
            </h2>
          </div>
        </div>
      </div>

      {/* User Section */}
      <div className="flex-none">
        <div className="flex items-center gap-3">
          {/* User Info - Hidden on mobile */}
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-800">
              {user?.first_name || user?.email}
            </span>
            <span className="text-xs text-slate-500 capitalize">
              {user?.role || "User"}
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown dropdown-end ">
            <label 
              tabIndex={0} 
              className="btn btn-ghost btn-circle border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <FiUser className="w-5 h-5 text-slate-700" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-white rounded-lg shadow-lg border border-slate-200 z-50 mt-3 w-56 p-2"
            >
              {/* User Info in Dropdown - Mobile Only */}
              <li className="md:hidden px-4 py-2 border-b border-slate-200 mb-2">
                <div className="flex flex-col gap-1 hover:bg-transparent">
                  <span className="text-sm font-semibold text-slate-800">
                    {user?.first_name || user?.email}
                  </span>
                  <span className="text-xs text-slate-500">
                    {user?.email}
                  </span>
                  <span className="text-xs text-blue-600 capitalize font-medium">
                    {user?.role || "User"}
                  </span>
                </div>
              </li>

              <li>
                <Link 
                  to="/" 
                  className="flex items-center gap-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                >
                  <FiHome className="w-4 h-4" />
                  <span className="font-medium">Home</span>
                </Link>
              </li>

              <li>
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                >
                  <FiGrid className="w-4 h-4" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                >
                  <FiUser className="w-4 h-4" />
                  <span className="font-medium">Profile</span>
                </Link>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button
                  type="button"
                  onClick={logoutUser}
                  className="flex items-center gap-3 hover:bg-red-50 hover:text-red-600 rounded-lg"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
