import React, { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import OverallProgressCards from "../components/StudentProgress/OverallProgressCards";
import EnrollmentProgressCard from "../components/StudentProgress/EnrollmentProgressCard";

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
      // Fetch all enrollments
      const enrollmentsList = await fetchEnrollments();

      if (enrollmentsList?.success === false) {
        setError(enrollmentsList.message || "Failed to load progress data.");
        return;
      }

      const validEnrollments = Array.isArray(enrollmentsList)
        ? enrollmentsList
        : [];
      setEnrollments(validEnrollments);

      // Fetch progress data for each enrollment
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

        // Filter by enrollment ID
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

  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (Object.keys(progressData).length === 0) return 0;

    let totalCompletion = 0;
    let enrollmentCount = 0;

    Object.values(progressData).forEach((progress) => {
      const assignmentPercent = progress.assignments.percentage || 0;
      const topicPercent = progress.topics.percentage || 0;
      totalCompletion += assignmentPercent + topicPercent;
      enrollmentCount += 2; // Two metrics per enrollment
    });

    return enrollmentCount > 0
      ? Math.round(totalCompletion / enrollmentCount)
      : 0;
  };

  // Get performance stats
  const getPerformanceStats = () => {
    let totalAssignments = 0;
    let completedAssignments = 0;
    let totalTopics = 0;
    let completedTopics = 0;

    Object.values(progressData).forEach((progress) => {
      totalAssignments += progress.assignments.total;
      completedAssignments += progress.assignments.completed;
      totalTopics += progress.topics.total;
      completedTopics += progress.topics.completed;
    });

    return {
      totalAssignments,
      completedAssignments,
      totalTopics,
      completedTopics,
    };
  };

  const overallProgress = calculateOverallProgress();
  const stats = getPerformanceStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Your Progress</h1>
          <p className="text-slate-600 mt-2">
            Track your learning progress across all enrollments.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error text-sm">{error}</div>
        ) : (
          <div className="space-y-6">
            {/* Overall Progress Card */}
            <div className="card bg-white border border-slate-200 shadow-sm">
              <OverallProgressCards
                overallProgress={overallProgress}
                stats={stats}
                enrollments={enrollments}
              />
            </div>

            {/* Enrollment-wise Progress */}
            {enrollments.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  Progress by Enrollment
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {enrollments.map((enrollment) => {
                    const progress = progressData[enrollment.id];
                    if (!progress) return null;
                    return (
                      <div
                        key={enrollment.id}
                        className="card bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <EnrollmentProgressCard
                          enrollment={enrollment}
                          progress={progress}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="card bg-white border border-slate-200 shadow-sm">
                <div className="card-body text-center py-12">
                  <p className="text-slate-600">No active enrollments yet.</p>
                  <a
                    href="/dashboard/my-enrollments"
                    className="link link-primary mt-2"
                  >
                    View Enrollments
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProgress;
