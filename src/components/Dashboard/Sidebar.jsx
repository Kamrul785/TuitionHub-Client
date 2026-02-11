import React from "react";
import {
  FiBarChart2,
  FiBookOpen,
  FiPlusCircle,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router";
import logo from "../../assets/Tuition_hub_logo.png";

const Sidebar = ({ role }) => {
  const menuItems = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: FiBarChart2,
      roles: ["Tutor", "User"],
    },
    {
      label: "My Tuitions",
      path: "/dashboard/tuitions",
      icon: FiBookOpen,
      roles: ["Tutor"],
    },
    {
      label: "Add Tuition",
      path: "/dashboard/tuitions/new",
      icon: FiPlusCircle,
      roles: ["Tutor"],
    },
    {
      label: "Applicants",
      path: "/dashboard/applications",
      icon: FiShoppingCart,
      roles: ["Tutor"],
    },
    {
      label: "My Applications",
      path: "/dashboard/applications",
      icon: FiShoppingCart,
      roles: ["User"],
    },
    {
      label: "Progress",
      path: "/dashboard/progress",
      icon: FiTag,
      roles: ["Tutor", "User"],
    },
    {
      label: "Reviews",
      path: "/dashboard/reviews",
      icon: FiStar,
      roles: ["Tutor", "User"],
    },
    {
      label: "Profile",
      path: "/dashboard/profile",
      icon: FiUsers,
      roles: ["Tutor", "User"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(role),
  );

  return (
    <div className="drawer-side z-10">
      <label
        htmlFor="drawer-toggle"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <aside className="menu bg-white/95 backdrop-blur w-64 min-h-full p-4 text-base-content border-r border-slate-200">
        {/* Sidebar header */}
        <div className="flex items-center gap-3 mb-6 px-2">
          {/* <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FiBookOpen className="h-5 w-5" />
          </span> */}
          <div>
            {/* <h1 className="text-lg font-bold">Tuition Hub</h1>
            <p className="text-xs text-slate-500">Student success</p> */}
            <img src={logo} alt="Tuition Hub Logo" />
          </div>
        </div>

        {/* Sidebar menu */}
        <ul className="menu menu-md gap-2">
          {filteredMenuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link to={item.path} className="flex items-center">
                  <Icon className="h-4 w-4 text-primary" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Sidebar footer */}
        <div className="mt-auto pt-6 text-xs text-base-content/70">
          © 2025 Tuition Hub. All rights reserved.
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
