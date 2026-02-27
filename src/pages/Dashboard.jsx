
import {
  FiBookOpen,
  FiPlusCircle,
  FiShoppingCart, 
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import StatCard from "../components/Dashboard/StatCard";
import ApplicationsPanel from "../components/Dashboard/ApplicationsPanel";

export default function Dashboard() {
  const { 
    user, 
    loadingUser, 
    fetchTuitions,
    fetchApplications,
    fetchEnrollments,
    fetchAssignments,
    fetchMyReviews,
  } = useAuthContext();

  const [stats, setStats] = useState({
    tuitionsCreated: "--",
    studentsEnrolled: "--",
    assignmentsCreated: "--",
    pendingApplicants: "--",
    applicationsSent: "--",
    enrolledTuitions: "--",
    assignmentsDue: "--",
    reviewsPending: "--",
  });

  const [applications, setApplications] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);

  const role = user?.role;  

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        if (role === "Tutor") {
          const tutionsData = await fetchTuitions();
          const allTuitions = tutionsData.results || tutionsData || [];
          const myTuitions = allTuitions.filter(
            (tuition) => tuition.tutor_email === user?.email
          );

          const applicationsData = await fetchApplications();
          const allApplications = applicationsData.results || applicationsData || [];
          const pendingApps = allApplications.filter(
            (app) => app.status === "PENDING"
          );

          // Set applications for display (limit to last 10)
          setApplications(allApplications.slice(0, 10));

          // Count total students enrolled
          let totalStudents = 0;
          let totalAssignments = 0;

          for (const tuition of myTuitions) {
            const enrollmentsData = await fetchEnrollments();
            const enrollments = enrollmentsData.results || enrollmentsData || [];
            const tuitionEnrollments = enrollments.filter(
              (enroll) => enroll.tuition === tuition.id
            );
            totalStudents += tuitionEnrollments.length;

            // Count assignments for this tuition's enrollments
            for (const enrollment of tuitionEnrollments) {
              const assignmentsData = await fetchAssignments(enrollment.id);
              const assignments = assignmentsData.results || assignmentsData || [];
              totalAssignments += assignments.length;
            }
          }

          setStats({
            tuitionsCreated: myTuitions.length,
            studentsEnrolled: totalStudents,
            assignmentsCreated: totalAssignments,
            pendingApplicants: pendingApps.length,
            applicationsSent: "--",
            enrolledTuitions: "--",
            assignmentsDue: "--",
            reviewsPending: "--",
          });
        } else {
          // Fetch student stats
          const applicationsData = await fetchApplications();
          const allApplications = applicationsData.results || applicationsData || [];

          // Set applications for display (limit to last 10)
          setApplications(allApplications.slice(0, 10));

          const enrollmentsData = await fetchEnrollments();
          const enrollments = enrollmentsData.results || enrollmentsData || [];

          // Count total assignments due
          let totalAssignments = 0;
          for (const enrollment of enrollments) {
            const assignmentsData = await fetchAssignments(enrollment.id);
            const assignments = assignmentsData.results || assignmentsData || [];
            totalAssignments += assignments.length;
          }

          // Count reviews pending (enrolled tuitions without review)
          const reviewsData = await fetchMyReviews();
          const myReviews = reviewsData || [];
          const reviewedTuitionIds = myReviews.map((review) => review.tuition);
          const reviewsPending = enrollments.filter(
            (enrollment) => !reviewedTuitionIds.includes(enrollment.tuition)
          ).length;

          setStats({
            tuitionsCreated: "--",
            studentsEnrolled: "--",
            assignmentsCreated: "--",
            pendingApplicants: "--",
            applicationsSent: allApplications.length,
            enrolledTuitions: enrollments.length,
            assignmentsDue: totalAssignments,
            reviewsPending: reviewsPending,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    if (!loadingUser && user?.email) {
      fetchStats();
    }
  }, [user, loadingUser, role, fetchTuitions, fetchApplications, fetchEnrollments, fetchAssignments, fetchMyReviews]);

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
            value: stats.tuitionsCreated,
            badge: "Total posted",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiUsers,
            label: "Students Enrolled",
            value: stats.studentsEnrolled,
            badge: "Across tuitions",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiPlusCircle,
            label: "Assignments Created",
            value: stats.assignmentsCreated,
            badge: "All topics",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiShoppingCart,
            label: "Pending Applicants",
            value: stats.pendingApplicants,
            badge: "Need review",
            badgeClass: "badge badge-outline text-xs",
          },
        ]
      : [
          {
            icon: FiShoppingCart,
            label: "Applications Sent",
            value: stats.applicationsSent,
            badge: "Submitted",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiBookOpen,
            label: "Enrolled Tuitions",
            value: stats.enrolledTuitions,
            badge: "Active",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiPlusCircle,
            label: "Assignments Due",
            value: stats.assignmentsDue,
            badge: "Upcoming",
            badgeClass: "badge badge-outline text-xs",
          },
          {
            icon: FiStar,
            label: "Reviews Pending",
            value: stats.reviewsPending,
            badge: "After selection",
            badgeClass: "badge badge-outline text-xs",
          },
        ];

  const activityTitle = "Recent Applications";
  const activityColumns =
    role === "Tutor"
      ? ["Application ID", "Student", "Tuition", "Status", "Date"]
      : ["Application ID", "Tuition", "Tutor", "Status", "Date"];

  return (
    <div>
      {statsLoading ? (
        // Show loading spinner while fetching data
        <div className="flex items-center justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <>
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

          {/* Applications Panel */}
          <ApplicationsPanel
            role={role}
            activityTitle={activityTitle}
            activityColumns={activityColumns}
            applications={applications}
          />
        </>
      )}
    </div>
  );
}
