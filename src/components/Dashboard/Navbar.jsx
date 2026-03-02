import React from "react";
import useAuthContext from "../../hooks/useAuthContext";
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiGrid,
  FiHome,
} from "react-icons/fi";
import { Link } from "react-router";

const Navbar = ({ sidebarOpen }) => {
  const { user, logoutUser } = useAuthContext();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center sticky top-0 z-40">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden mr-3">
        <label
          htmlFor="drawer-toggle"
          className="btn btn-ghost btn-sm btn-square hover:bg-slate-50"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <FiX className="w-5 h-5 text-slate-600" />
          ) : (
            <FiMenu className="w-5 h-5 text-slate-600" />
          )}
        </label>
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-slate-800 truncate">
          Dashboard
        </h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* User chip */}
        <div className="hidden sm:flex items-center gap-2.5 pl-3 pr-1.5 py-1 rounded-full bg-slate-50 border border-slate-200">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-slate-700 leading-tight">
              {user?.first_name || user?.email?.split("@")[0]}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium leading-tight">
              {user?.role || "User"}
            </span>
          </div>
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-xs font-semibold text-indigo-600">
              {(user?.first_name?.[0] || user?.email?.[0] || "U").toUpperCase()}
            </span>
          </div>
        </div>

        {/* Dropdown */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-sm btn-circle border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
            aria-label="User menu"
          >
            <FiUser className="w-4 h-4 text-slate-600" />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-xl shadow-lg border border-slate-200 bg-white z-[100] mt-2 w-52 p-1.5"
          >
            <li className="sm:hidden">
              <div className="flex flex-col gap-0.5 pointer-events-none px-3 py-2">
                <span className="text-sm font-semibold text-slate-800">
                  {user?.first_name || user?.email?.split("@")[0]}
                </span>
                <span className="text-xs text-slate-400">{user?.email}</span>
              </div>
            </li>
            <li className="sm:hidden"><hr className="border-slate-100 my-1" /></li>

            <li>
              <Link to="/" className="flex items-center gap-2.5 rounded-lg text-sm hover:bg-slate-50">
                <FiHome className="w-4 h-4 text-slate-400" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="flex items-center gap-2.5 rounded-lg text-sm hover:bg-slate-50">
                <FiGrid className="w-4 h-4 text-slate-400" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile" className="flex items-center gap-2.5 rounded-lg text-sm hover:bg-slate-50">
                <FiUser className="w-4 h-4 text-slate-400" />
                Profile
              </Link>
            </li>
            <li><hr className="border-slate-100 my-1" /></li>
            <li>
              <button
                onClick={logoutUser}
                className="flex items-center gap-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50"
              >
                <FiLogOut className="w-4 h-4" />
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
