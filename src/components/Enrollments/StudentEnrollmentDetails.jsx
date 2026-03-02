import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import authApiClient from "../../services/auth-api-client";
import apiClient from "../../services/api-client";
import useAuthContext from "../../hooks/useAuthContext";
import { useToast } from "../ui/Toast";
import { FiArrowLeft, FiClipboard, FiBookOpen, FiCreditCard } from "react-icons/fi";

const StudentEnrollmentDetails = () => {
  const { id } = useParams();
  const { fetchEnrollmentById } = useAuthContext();
  const toast = useToast();
  const [enrollment, setEnrollment] = useState(null);
  const [tuitionTutorEmail, setTuitionTutorEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      const data = await fetchEnrollmentById(id);
      if (data?.success === false) {
        setError(data.message || "Failed to load enrollment details.");
        setEnrollment(null);
      } else {
        setEnrollment(data);
        if (data?.tutor_email) { setTuitionTutorEmail(data.tutor_email); }
        else if (data?.tuition) {
          try {
            const res = await apiClient.get(`/tuitions/${data.tuition}/`);
            setTuitionTutorEmail(res.data?.tutor_email || "");
          } catch {
            setTuitionTutorEmail("");
          }
        }
      }
      setLoading(false);
    };
    if (id) load();
  }, [fetchEnrollmentById, id]);

  const formatDate = (s) => s ? new Date(s).toLocaleString() : "-";
  const needsPayment = enrollment?.is_paid === true && enrollment?.payment_verified === false;
  const paymentVerified = enrollment?.payment_verified === true;

  const handlePayNow = async () => {
    setPaymentLoading(true);
    try {
      const response = await authApiClient.post("/payment/initiate/", { amount: enrollment.price, enrollment_id: enrollment.id });
      if (response.data?.payment_url) { window.location.href = response.data.payment_url; }
      else { toast.error("Failed to initiate payment. Please try again."); }
    } catch (err) {
      toast.error(err.response?.data?.error || err.response?.data?.detail || "Payment initiation failed.");
    } finally { setPaymentLoading(false); }
  };

  const InfoCell = ({ label, value }) => (
    <div className="p-4 bg-slate-50 rounded-lg">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );

  return (
    <div className="section-container">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/dashboard/my-enrollments" className="text-slate-400 hover:text-slate-600 transition-colors">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Enrollment Details</h1>
            <p className="text-sm text-slate-500">Review enrollment information and your learning progress.</p>
          </div>
        </div>

        <div className="card-modern p-6 sm:p-8">
          {loading ? (
            <div className="space-y-4">
              <div className="skeleton-pulse h-6 w-48 rounded"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => <div key={i} className="skeleton-pulse h-20 rounded-lg"></div>)}
              </div>
            </div>
          ) : error ? (
            <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</div>
          ) : enrollment ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoCell label="Tuition" value={enrollment.tuition_title} />
                <InfoCell label="Tutor" value={enrollment.tutor_email || tuitionTutorEmail || "-"} />
                <InfoCell label="Enrolled On" value={formatDate(enrollment.enrolled_at)} />
                <InfoCell label="Enrollment ID" value={`#${enrollment.id}`} />
              </div>

              {needsPayment && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 flex items-center justify-between gap-4">
                  <p className="text-sm text-amber-800">Payment required: <span className="font-bold">{enrollment.price} BDT</span></p>
                  <button onClick={handlePayNow} disabled={paymentLoading}
                    className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none btn-sm gap-2">
                    {paymentLoading ? <><span className="loading loading-spinner loading-xs"></span> Processing...</> : <><FiCreditCard className="w-4 h-4" /> Pay Now</>}
                  </button>
                </div>
              )}

              {paymentVerified && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4">
                  <p className="text-sm text-emerald-700 font-medium">Payment verified. You have full access.</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                {needsPayment ? (
                  <>
                    <button disabled className="btn btn-ghost btn-sm opacity-50 cursor-not-allowed gap-2">
                      <FiClipboard className="w-4 h-4" /> Assignments
                    </button>
                    <button disabled className="btn btn-ghost btn-sm opacity-50 cursor-not-allowed gap-2">
                      <FiBookOpen className="w-4 h-4" /> Topics
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={`/dashboard/my-enrollments/${id}/assignments`}
                      className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none btn-sm gap-2">
                      <FiClipboard className="w-4 h-4" /> View Assignments
                    </Link>
                    <Link to={`/dashboard/my-enrollments/${id}/topics`}
                      className="btn btn-ghost btn-sm gap-2 text-slate-600">
                      <FiBookOpen className="w-4 h-4" /> View Topics
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-slate-500 text-center py-8">Enrollment not found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollmentDetails;
