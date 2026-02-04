import React from "react";
import { Link } from "react-router";
import logo from '../assets/tuition_hub_logo.png';
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      {/* Logo/Brand Section */}
      <div className="flex-1">
        <Link to="/"><img src={logo} alt="Logo" className="h-15" /></Link>
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
          <Link to="/login" className="btn btn-outline btn-md">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary btn-md">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
