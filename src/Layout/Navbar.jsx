import React from "react";
import { Link, useLocation } from "react-router";
import { FiUser, FiLogOut, FiGrid, FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/Tuition_hub_logo.png";
import useAuthContext from "../hooks/useAuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/tuitions", label: "Browse Tuitions" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const { user, logoutUser } = useAuthContext();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="glass-surface sticky top-0 z-50 border-b border-slate-200/60">
      <nav className="section-container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Tuition Hub" className="h-10 lg:h-11" />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === link.to
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              {/* User chip - desktop */}
              <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-xs font-semibold text-indigo-600">
                    {(user.first_name?.[0] || user.email?.[0] || "U").toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-800 leading-tight">
                    {user.first_name || user.email?.split("@")[0]}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium leading-tight">
                    {user.role || "User"}
                  </span>
                </div>
              </div>

              {/* Profile dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-sm btn-circle border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                  aria-label="User menu"
                >
                  <FiUser className="w-4 h-4 text-slate-600" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content rounded-xl shadow-lg border border-slate-200 bg-white z-[100] mt-2 w-52 p-1.5"
                >
                  {/* Mobile user info */}
                  <li className="md:hidden">
                    <div className="flex flex-col gap-0.5 pointer-events-none px-3 py-2">
                      <span className="text-sm font-semibold text-slate-800">
                        {user.first_name || user.email?.split("@")[0]}
                      </span>
                      <span className="text-xs text-slate-400">{user.email}</span>
                    </div>
                  </li>
                  <li className="md:hidden"><hr className="border-slate-100 my-1" /></li>

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

              {/* Mobile hamburger */}
              <button
                className="lg:hidden btn btn-ghost btn-sm btn-circle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="btn btn-ghost btn-sm text-slate-600 font-medium hover:bg-slate-100"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm font-medium shadow-sm hover:shadow-md transition-shadow"
              >
                Sign up
              </Link>

              {/* Mobile hamburger for unauthenticated */}
              <button
                className="lg:hidden btn btn-ghost btn-sm btn-circle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white animate-fade-in">
          <div className="section-container py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 text-sm font-medium rounded-lg ${
                  pathname === link.to
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
