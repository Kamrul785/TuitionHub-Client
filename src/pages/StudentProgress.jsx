import React, { useEffect, useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import useAuthContext from "../hooks/useAuthContext";
import OverallProgressCards from "../components/StudentProgress/OverallProgressCards";
import EnrollmentProgressCard from "../components/StudentProgress/EnrollmentProgressCard";
import SectionHeader from "../components/ui/SectionHeader";
import { StatCardSkeleton } from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";

const StudentProgress = () => {
  const { fetchEnrollments, fetchAssignments, fetchTopics } = useAuthContext();
  const [enrollments, setEnrollments] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    setLoading(true);
    setError("");
    try {
      const enrollmentsList = await fetchEnrollments();

      if (enrollmentsList?.success === false) {
        setError(enrollmentsList.message || "Failed to load progress data.");
        return;
      }

      const validEnrollments = Array.isArray(enrollmentsList)
        ? enrollmentsList
        : [];
      setEnrollments(validEnrollments);

      const progress = {};
      for (const enrollment of validEnrollments) {
        const [assignmentsData, topicsData] = await Promise.all([
          fetchAssignments(enrollment.id),
          fetchTopics(enrollment.id),
        ]);

        const assignments = Array.isArray(assignmentsData)
          ? assignmentsData
          : [];
        const topics = Array.isArray(topicsData) ? topicsData : [];

        const enrollmentAssignments = assignments.filter(
          (a) => a.enrollment === enrollment.id,
        );
        const enrollmentTopics = topics.filter(
          (t) => t.enrollment === enrollment.id,
        );

        const completedAssignments = enrollmentAssignments.filter(
          (a) => a.completed,
        ).length;
        const completedTopics = enrollmentTopics.filter(
          (t) => t.completed,
        ).length;

        progress[enrollment.id] = {
          assignments: {
            total: enrollmentAssignments.length,
            completed: completedAssignments,
            percentage:
              enrollmentAssignments.length > 0
                ? Math.round(
                    (completedAssignments / enrollmentAssignments.length) * 100,
                  )
                : 0,
          },
          topics: {
            total: enrollmentTopics.length,
            completed: completedTopics,
            percentage:
              enrollmentTopics.length > 0
                ? Math.round((completedTopics / enrollmentTopics.length) * 100)
                : 0,
          },
        };
      }

      setProgressData(progress);
    } catch (err) {
      setError("Failed to load progress data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallProgress = () => {
    if (Object.keys(progressData).length === 0) return 0;
    let totalCompletion = 0;
    let enrollmentCount = 0;
    Object.values(progressData).forEach((progress) => {
      totalCompletion += (progress.assignments.percentage || 0) + (progress.topics.percentage || 0);
      enrollmentCount += 2;
    });
    return enrollmentCount > 0 ? Math.round(totalCompletion / enrollmentCount) : 0;
  };

  const getPerformanceStats = () => {
    let totalAssignments = 0, completedAssignments = 0, totalTopics = 0, completedTopics = 0;
    Object.values(progressData).forEach((progress) => {
      totalAssignments += progress.assignments.total;
      completedAssignments += progress.assignments.completed;
      totalTopics += progress.topics.total;
      completedTopics += progress.topics.completed;
    });
    return { totalAssignments, completedAssignments, totalTopics, completedTopics };
  };

  const overallProgress = calculateOverallProgress();
  const stats = getPerformanceStats();

  return (
    <div className="section-container">
      <SectionHeader
        title="Your Progress"
        description="Track your learning progress across all enrollments"
      />

      {loading ? (
        <div className="space-y-6">
          <div className="card-modern p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="card-modern p-6">
                <div className="skeleton-pulse h-5 w-40 rounded mb-4" />
                <div className="skeleton-pulse h-3 w-full rounded mb-3" />
                <div className="skeleton-pulse h-3 w-full rounded mb-3" />
                <div className="skeleton-pulse h-3 w-3/4 rounded" />
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="card-modern p-4 border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      ) : (
        <div className="space-y-8">
          <OverallProgressCards
            overallProgress={overallProgress}
            stats={stats}
            enrollments={enrollments}
          />

          {enrollments.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Progress by Enrollment
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 stagger-children">
                {enrollments.map((enrollment) => {
                  const progress = progressData[enrollment.id];
                  if (!progress) return null;
                  return (
                    <EnrollmentProgressCard
                      key={enrollment.id}
                      enrollment={enrollment}
                      progress={progress}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={FiBarChart2}
              title="No enrollments yet"
              description="Enroll in a tuition to start tracking your progress"
              actionLabel="Browse Tuitions"
              actionTo="/tuitions"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default StudentProgress;
