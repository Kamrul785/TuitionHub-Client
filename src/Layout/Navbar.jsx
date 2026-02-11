import React from "react";
import { Link } from "react-router";
import logo from "../assets/tuition_hub_logo.png";
import useAuthContext from "../hooks/useAuthContext";
const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      {/* Logo/Brand Section */}
      <div className="flex-1">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-14" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center">
        <div>
          <ul className="menu menu-horizontal px-2 hidden text-md font-semibold md:flex">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tuitions">Browse Tuitions</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-2 ml-4">
          {user ? (
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />{" "}
                    </svg>
                    <span className="badge badge-sm indicator-item">8</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">8 Items</span>
                    <span className="text-info">Subtotal: $999</span>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-block">
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
                    <button
                      type="button"
                      onClick={logoutUser}
                      className="justify-between"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-outline btn-md">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-md">
                Register
              </Link>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
