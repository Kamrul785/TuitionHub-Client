
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
import { StatCardSkeleton, TableSkeleton } from "../components/ui/Skeleton";
import SectionHeader from "../components/ui/SectionHeader";

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
  const [tuitionTutorMap, setTuitionTutorMap] = useState({});
  const [statsLoading, setStatsLoading] = useState(true);

  const role = user?.role;  

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        if (role === "Tutor") {
          // Fetch tuitions, applications, and enrollments in PARALLEL
          const [tutionsData, applicationsData, enrollmentsData] =
            await Promise.all([
              fetchTuitions(),
              fetchApplications(),
              fetchEnrollments(),
            ]);

          const allTuitions = tutionsData.results || tutionsData || [];
          const myTuitions = allTuitions.filter(
            (tuition) => tuition.tutor_email === user?.email
          );
          const myTuitionIds = new Set(myTuitions.map((t) => t.id));

          const allApplications = applicationsData.results || applicationsData || [];
          const pendingApps = allApplications.filter(
            (app) => app.status === "PENDING"
          );
          setApplications(allApplications.slice(0, 10));

          // Filter enrollments for my tuitions (single fetch, no loop)
          const allEnrollments = enrollmentsData.results || enrollmentsData || [];
          const myEnrollments = allEnrollments.filter(
            (e) => myTuitionIds.has(e.tuition)
          );

          // Fetch assignments for all enrollments in PARALLEL
          const assignmentResults = await Promise.all(
            myEnrollments.map((e) => fetchAssignments(e.id).catch(() => []))
          );
          const totalAssignments = assignmentResults.reduce((sum, data) => {
            const assignments = data.results || data || [];
            return sum + assignments.length;
          }, 0);

          // Build tutor map for ApplicationsPanel
          const map = {};
          allTuitions.forEach((t) => { map[t.id] = t.tutor_email || "-"; });
          setTuitionTutorMap(map);

          setStats({
            tuitionsCreated: myTuitions.length,
            studentsEnrolled: myEnrollments.length,
            assignmentsCreated: totalAssignments,
            pendingApplicants: pendingApps.length,
            applicationsSent: "--",
            enrolledTuitions: "--",
            assignmentsDue: "--",
            reviewsPending: "--",
          });
        } else {
          // STUDENT: Fetch applications, enrollments, and reviews in PARALLEL
          const [applicationsData, enrollmentsData, myReviews] =
            await Promise.all([
              fetchApplications(),
              fetchEnrollments(),
              fetchMyReviews(),
            ]);

          const allApplications = applicationsData.results || applicationsData || [];
          setApplications(allApplications.slice(0, 10));

          const enrollments = enrollmentsData.results || enrollmentsData || [];

          // Fetch assignments for all enrollments in PARALLEL
          const assignmentResults = await Promise.all(
            enrollments.map((e) => fetchAssignments(e.id).catch(() => []))
          );
          const totalAssignments = assignmentResults.reduce((sum, data) => {
            const assignments = data.results || data || [];
            return sum + assignments.length;
          }, 0);

          const reviewedTuitionIds = (myReviews || []).map((review) => review.tuition);
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
    return null;
  }

  const statCards =
    role === "Tutor"
      ? [
          { icon: FiBookOpen, label: "Tuitions Created", value: stats.tuitionsCreated, badge: "Total" },
          { icon: FiUsers, label: "Students Enrolled", value: stats.studentsEnrolled, badge: "Active" },
          { icon: FiPlusCircle, label: "Assignments", value: stats.assignmentsCreated, badge: "Created" },
          { icon: FiShoppingCart, label: "Pending Applicants", value: stats.pendingApplicants, badge: "Review" },
        ]
      : [
          { icon: FiShoppingCart, label: "Applications Sent", value: stats.applicationsSent, badge: "Total" },
          { icon: FiBookOpen, label: "Enrolled Tuitions", value: stats.enrolledTuitions, badge: "Active" },
          { icon: FiPlusCircle, label: "Assignments Due", value: stats.assignmentsDue, badge: "Pending" },
          { icon: FiStar, label: "Reviews Pending", value: stats.reviewsPending, badge: "To do" },
        ];

  const activityTitle = "Recent Applications";
  const activityColumns =
    role === "Tutor"
      ? ["Application ID", "Student", "Tuition", "Status", "Date"]
      : ["Application ID", "Tuition", "Tutor", "Status", "Date"];

  return (
    <div className="space-y-6">
      <SectionHeader
        title={`Welcome back, ${user?.first_name || "there"}`}
        description={`Here's what's happening with your ${role === "Tutor" ? "tuitions" : "learning"} today.`}
      />

      {statsLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
          <TableSkeleton rows={5} cols={5} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            {statCards.map((card, index) => (
              <StatCard
                key={index}
                icon={card.icon}
                label={card.label}
                value={card.value}
                badge={card.badge}
              />
            ))}
          </div>

          <ApplicationsPanel
            role={role}
            activityTitle={activityTitle}
            activityColumns={activityColumns}
            applications={applications}
            tuitionTutorMap={tuitionTutorMap}
          />
        </>
      )}
    </div>
  );
}
