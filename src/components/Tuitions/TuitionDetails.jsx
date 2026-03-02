import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import apiClient from "../../services/api-client";
import useAuthContext from "../../hooks/useAuthContext";
import TuitionHeader from "./TuitionHeader";
import TuitionInfo from "./TuitionInfo";
import ReviewSection from "./ReviewSection";
import { useToast } from "../ui/Toast";
import Skeleton from "../ui/Skeleton";
import EmptyState from "../ui/EmptyState";
import { FiAlertCircle } from "react-icons/fi";

const TuitionDetails = () => {
  const { id } = useParams();
  const toast = useToast();
  const {
    user,
    fetchApplications,
    applyForTuition,
    fetchEnrollments,
    fetchTuitionReviews,
    createTuitionReview,
    updateTuitionReview,
    deleteTuitionReview,
  } = useAuthContext();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [applying, setApplying] = useState(false);
  const [checkApply, setCheckApply] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetchTuitionDetails = async () => {
      try {
        const response = await apiClient.get(`/tuitions/${id}/`);
        setTuition(response.data);
      } catch (err) {
        setError(
           "Unable to load tuition details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTuitionDetails();
  }, [id]);

  // Check if user already applied
  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (!user || !tuition) return;
      // console.log("Checking application status for user:", user.email);
      setCheckApply(true);
      try {
        const applicationsData = await fetchApplications();
        // console.log("Fetched applications:", applicationsData.results);
        const existingApp = applicationsData.results.find(
          (app) => app.tuition === tuition.id,
        );
        setApplicationStatus(existingApp || null);
      } catch (err) {
        setError(
           "Failed to check application status.",
        );
      } finally {
        setCheckApply(false);
      }
    };
    checkApplicationStatus();
  }, [user, tuition, fetchApplications]);

  const normalizeList = (data) =>
    Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
        ? data.results
        : [];

  useEffect(() => {
    const loadReviews = async () => {
      setReviewsLoading(true);
      setReviewsError("");
      const data = await fetchTuitionReviews(id);

      if (data?.success === false) {
        setReviewsError("Login to view reviews.");
        setReviews([]);
      } else {
        setReviews(normalizeList(data));
      }

      setReviewsLoading(false);
    };

    if (id) {
      loadReviews();
    }
  }, [id, fetchTuitionReviews]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || user.role !== "User" || !tuition) {
        setCanReview(false);
        return;
      }

      const data = await fetchEnrollments();
      if (data?.success === false) {
        setCanReview(false);
        return;
      }

      const enrollmentList = normalizeList(data);
      const isEnrolled = enrollmentList.some(
        (enrollment) =>
          enrollment.tuition === tuition.id ||
          enrollment.tuition_title === tuition.title,
      );
      setCanReview(isEnrolled);
    };

    checkEnrollment();
  }, [user, tuition, fetchEnrollments]);

  useEffect(() => {
    if (!user) {
      setAlreadyReviewed(false);
      return;
    }

    const hasReview = reviews.some(
      (review) =>
        review.student_email === user.email
    );
    setAlreadyReviewed(hasReview);
  }, [reviews, user]);

  const handleApply = async () => {
    if (!user) {
      toast.error("Please login to apply for tuition.");
      return;
    }

    if (applicationStatus && applicationStatus.status !== "REJECTED") {
      toast.info("You have already applied for this tuition.");
      return;
    }

    setApplying(true);
    const result = await applyForTuition(tuition.id);

    if (result?.success === false) {
      toast.error("Failed to apply for tuition.");
    } else if (result?.id) {
      setApplicationStatus(result);
      toast.success("Successfully applied for tuition!");
    } else {
      toast.info("Application submitted. Check your applications.");
    }

    setApplying(false);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    if (!rating) return;

    setSubmittingReview(true);
    setReviewsError("");

    const payload = {
      rating: Number(rating),
      comment,
    };

    // console.log("Submitting review:", { tuitionId: id, payload });
    const result = await createTuitionReview(id, payload);
    // console.log("Review result:", result);

    if (result?.success === false) {
      setReviewsError("Failed to submit review.");
      // console.error("Review submission failed:", result.message);
    } else if (result?.success === true && result?.data) {
      setReviews((prev) => [result.data, ...prev]);
      setComment("");
      setRating(5);
      setAlreadyReviewed(true);
      // console.log("Review submitted successfully!");
    } else {
      setReviewsError("Unknown error occurred. Please try again.");
      // console.error("Unexpected response:", result);
    }

    setSubmittingReview(false);
  };

  const handleUpdateReview = async (reviewId, payload) => {
    const result = await updateTuitionReview(reviewId, payload);
    if (result?.success === true && result?.data) {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? result.data : review
        )
      );
    } else {
      setReviewsError(result?.message || "Failed to update review.");
    }
    return result;
  };

  const handleDeleteReview = async (reviewId) => {
    const result = await deleteTuitionReview(reviewId);
    if (result?.success === true) {
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    } else {
      setReviewsError(result?.message || "Failed to delete review.");
    }
    return result;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="card-modern p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !tuition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <EmptyState
          icon={FiAlertCircle}
          title={error || "Tuition not found"}
          description="The tuition you're looking for doesn't exist or has been removed."
          actionLabel="Back to Tuitions"
          actionTo="/tuitions"
        />
      </div>
    );
  }

  const canApply =
    !applicationStatus || applicationStatus.status === "REJECTED";

  return (
    <div className="min-h-screen bg-slate-50">
      <TuitionHeader tuition={tuition} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="card-modern p-6 md:p-8">
          <TuitionInfo
            tuition={tuition}
            onApply={handleApply}
            applying={applying}
            canApply={canApply}
            checkApply={checkApply}
            applicationStatus={applicationStatus}
          />

          <ReviewSection
            canReview={canReview}
            alreadyReviewed={alreadyReviewed}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            submittingReview={submittingReview}
            reviewsError={reviewsError}
            onSubmitReview={handleSubmitReview}
            reviews={reviews}
            reviewsLoading={reviewsLoading}
            currentUserId={user?.email}
            onUpdateReview={handleUpdateReview}
            onDeleteReview={handleDeleteReview}
          />
        </div>
      </section>
    </div>
  );
};

export default TuitionDetails;
