import React from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { FiBookOpen, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router";

const Navbar = ({ sidebarOpen }) => {
  const { logoutUser } = useAuthContext();

  return (
    <div className="navbar bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="flex-none lg:hidden">
        <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
          {sidebarOpen ? (
            <FiX className="h-5 w-5" />
          ) : (
            <FiMenu className="h-5 w-5" />
          )}
        </label>    
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FiBookOpen className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Overview
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              Tuition Hub Dashboard
            </h2>
          </div>
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
          >
            <li>
              <Link to="/dashboard" className="justify-between">
                Dashboard
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <button type="button" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
