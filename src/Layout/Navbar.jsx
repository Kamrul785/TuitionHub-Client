import React from "react";
import { Link } from "react-router";
import { FiUser, FiLogOut, FiGrid, FiMenu } from "react-icons/fi";
import logo from "../assets/Tuition_hub_logo.png";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  
  return (
    <div className="navbar bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 px-4 lg:px-8">
      {/* Logo Section */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Tuition Hub Logo" className="h-12 lg:h-14" />
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-1">
        <Link 
          to="/" 
          className="px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
        >
          Home
        </Link>
        <Link 
          to="/tuitions" 
          className="px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
        >
          Browse Tuitions
        </Link>
        <Link 
          to="/about" 
          className="px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
        >
          About
        </Link>
      </div>

      {/* Auth Section */}
      <div className="flex items-center gap-2 ml-4">
        {user ? (
          <div className="flex items-center gap-3">
            {/* User Info - Hidden on mobile */}
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-800">
                {user.first_name || user.email}
              </span>
              <span className="text-xs text-slate-500 capitalize">
                {user.role || "User"}
              </span>
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <FiUser className="w-5 h-5 text-slate-700" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-white rounded-lg shadow-lg border border-slate-200 z-[1] mt-3 w-56 p-2"
              >
                {/* User Info in Dropdown - Mobile Only */}
                <li className="md:hidden px-4 py-2 border-b border-slate-200 mb-2">
                  <div className="flex flex-col gap-1 hover:bg-transparent">
                    <span className="text-sm font-semibold text-slate-800">
                      {user.first_name || user.email}
                    </span>
                    <span className="text-xs text-slate-500">
                      {user.email}
                    </span>
                    <span className="text-xs text-blue-600 capitalize font-medium">
                      {user.role || "User"}
                    </span>
                  </div>
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
                    to="/dashboard/profile" 
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

            {/* Mobile Menu Button */}
            <div className="dropdown dropdown-end lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <FiMenu className="w-5 h-5" />
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-white rounded-lg shadow-lg border border-slate-200 z-[1] mt-3 w-52 p-2"
              >
                <li>
                  <Link to="/" className="font-medium">Home</Link>
                </li>
                <li>
                  <Link to="/tuitions" className="font-medium">Browse Tuitions</Link>
                </li>
                <li>
                  <Link to="/about" className="font-medium">About</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link 
              to="/login" 
              className="btn btn-ghost btn-sm lg:btn-md text-slate-700 hover:bg-slate-100 font-semibold"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="btn btn-primary btn-sm lg:btn-md font-semibold shadow-md hover:shadow-lg transition-shadow"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
