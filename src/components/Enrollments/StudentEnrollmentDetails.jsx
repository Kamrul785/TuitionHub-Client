import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";
const StudentEnrollmentDetails = () => {
  const { id } = useParams();
  const { fetchEnrollmentById, fetchTuitions } = useAuthContext();
  const [enrollment, setEnrollment] = useState(null);
  const [tuitionTutorEmail, setTuitionTutorEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const loadEnrollment = async () => {
      setLoading(true);
      setError("");
      const data = await fetchEnrollmentById(id);

      if (data?.success === false) {
        setError(data.message || "Failed to load enrollment details.");
        setEnrollment(null);
        setTuitionTutorEmail("");
      } else {
        setEnrollment(data);

        if (data?.tutor_email) {
          setTuitionTutorEmail(data.tutor_email);
        } else if (data?.tuition) {
          const tuitionData = await fetchTuitions();
          if (tuitionData?.success === false) {
            setTuitionTutorEmail("");
          } else {
            const tuitionList = tuitionData?.results || [];
            const matchedTuition = tuitionList.find(
              (tuition) => tuition.id === data.tuition,
            );
            setTuitionTutorEmail(matchedTuition?.tutor_email || "");
          }
        } else {
          setTuitionTutorEmail("");
        }
      }

      setLoading(false);
    };

    if (id) {
      loadEnrollment();
    }
  }, [fetchEnrollmentById, fetchTuitions, id]);

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // Payment logic
  const needsPayment = enrollment?.is_paid === true && enrollment?.payment_verified === false;
  const paymentVerified = enrollment?.payment_verified === true;

  const handlePayNow = async () => {
    setPaymentLoading(true);
    try {
      const response = await authApiClient.post(
        "/payment/initiate/",
        {
          amount: enrollment.price,
          enrollment_id: enrollment.id,
        }
      );
      // Backend will return payment_url, you can redirect here
      if (response.data?.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        alert("Failed to initiate payment. Please try again.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Payment initiation failed. Please try again.";
      alert(errorMessage);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Enrollment Details
          </h1>
          <p className="text-slate-600 mt-1">
            Review enrollment information and your learning progress.
          </p>
        </div>

        <div className="card bg-white border border-slate-200 shadow-sm">
          <div className="card-body">
            {loading ? (
              <div className="flex items-center gap-2 text-slate-600">
                <span className="loading loading-spinner loading-sm"></span>
                Loading enrollment...
              </div>
            ) : error ? (
              <div className="alert alert-error text-sm">{error}</div>
            ) : enrollment ? (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Tuition</p>
                    <p className="text-lg font-semibold text-slate-800">
                      {enrollment.tuition_title}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Tutor Email</p>
                    <p className="text-lg font-semibold text-slate-800">
                      {enrollment.tutor_email || tuitionTutorEmail || "-"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Enrolled On</p>
                    <p className="text-lg font-semibold text-slate-800">
                      {formatDate(enrollment.enrolled_at)}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Enrollment ID</p>
                    <p className="text-lg font-semibold text-slate-800">
                      #{enrollment.id}
                    </p>
                  </div>
                </div>

                {needsPayment && (
                  <div className="alert alert-warning">
                    <span>
                      Payment required: {enrollment.price} BDT. Click "Pay Now" to complete payment.
                    </span>
                  </div>
                )}

                {paymentVerified && (
                  <div className="alert alert-success">
                    <span>✓ Payment verified. You have full access to this tuition.</span>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-3">
                  {needsPayment ? (
                    <>
                      <button
                        onClick={handlePayNow}
                        disabled={paymentLoading}
                        className="btn btn-primary"
                      >
                        {paymentLoading ? (
                          <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Processing...
                          </>
                        ) : (
                          "Pay Now"
                        )}
                      </button>
                      <button
                        disabled
                        className="btn btn-primary opacity-50 cursor-not-allowed"
                        title="Complete payment to unlock"
                      >
                        View Assignments
                      </button>
                      <button
                        disabled
                        className="btn btn-outline opacity-50 cursor-not-allowed"
                        title="Complete payment to unlock"
                      >
                        View Topics
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/dashboard/my-enrollments/${id}/assignments`}
                        className="btn btn-primary"
                      >
                        View Assignments
                      </Link>
                      <Link
                        to={`/dashboard/my-enrollments/${id}/topics`}
                        className="btn btn-outline"
                      >
                        View Topics
                      </Link>
                    </>
                  )}
                  <Link
                    to="/dashboard/my-enrollments"
                    className="btn btn-ghost"
                  >
                    Back to Enrollments
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-slate-500">Enrollment not found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollmentDetails;
