import {
  FiBarChart2,
  FiBookOpen,
  FiCreditCard,
  FiPlusCircle,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { Link, useLocation } from "react-router";
import logo from "../../assets/Tuition_hub_logo.png";

const Sidebar = ({ role }) => {
  const { pathname } = useLocation();

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
      label: "Applications",
      path: "/dashboard/applications",
      icon: FiUsers,
      roles: ["Tutor"],
    },
    {
      label: "Enrollment",
      path: "/dashboard/enrollment",
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
      label: "My Enrollments",
      path: "/dashboard/my-enrollments",
      icon: FiBookOpen,
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
      label: "Transactions",
      path: "/dashboard/transactions",
      icon: FiCreditCard,
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

  const isActive = (path) => {
    if (path === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(path);
  };

  return (
    <div className="drawer-side z-10">
      <label
        htmlFor="drawer-toggle"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <aside className="w-64 min-h-full bg-white border-r border-slate-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-slate-100">
          <Link to="/">
            <img src={logo} alt="Tuition Hub" className="h-9" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path + item.label}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-indigo-500" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-100">
          <p className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} TuitionHub
          </p>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
