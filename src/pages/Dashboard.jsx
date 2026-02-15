
import {
  FiBookOpen,
  FiPlusCircle,
  FiShoppingCart, 
  FiStar,
  FiUsers,
} from "react-icons/fi";
import useAuthContext from "../hooks/useAuthContext";
import StatCard from "../components/Dashboard/StatCard";
import ApplicationsPanel from "../components/Dashboard/ApplicationsPanel";

export default function Dashboard() {
  const { user, loadingUser } = useAuthContext();
  const role = user?.role;


  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  const statCards =
    role === "Tutor"
      ? [
          {
            icon: FiBookOpen,
            label: "Tuitions Created",
            value: "--",
            badge: "Total posted",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiUsers,
            label: "Students Enrolled",
            value: "--",
            badge: "Across tuitions",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiPlusCircle,
            label: "Assignments Created",
            value: "--",
            badge: "All topics",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiShoppingCart,
            label: "Pending Applicants",
            value: "--",
            badge: "Need review",
            badgeClass: "badge badge-outline text-xs",
          },
        ]
      : [
          {
            icon: FiShoppingCart,
            label: "Applications Sent",
            value: "--",
            badge: "Submitted",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiBookOpen,
            label: "Enrolled Tuitions",
            value: "--",
            badge: "Active",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiPlusCircle,
            label: "Assignments Due",
            value: "--",
            badge: "Upcoming",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiStar,
            label: "Reviews Pending",
            value: "--",
            badge: "After selection",
            badgeClass: "badge badge-outline text-xs",
          },
        ];

  const activityTitle = "Recent Applications";  const activityColumns =
    role === "Tutor"
      ? ["Application ID", "Student", "Tuition", "Status", "Date"]
      : ["Application ID", "Tuition", "Tutor", "Status", "Date"];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 ">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            icon={card.icon}
            label={card.label}
            value={card.value}
            badge={card.badge}
            badgeClass={card.badgeClass}
          />
        ))}
      </div>
      <ApplicationsPanel
        role={role}
        activityTitle={activityTitle}
        activityColumns={activityColumns}
      />
    </div>
  );
}
