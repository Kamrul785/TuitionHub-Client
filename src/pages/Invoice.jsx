import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import SectionHeader from "../components/ui/SectionHeader";
import { FiArrowLeft, FiPrinter } from "react-icons/fi";

const Invoice = () => {
  const { id } = useParams();
  const { fetchPaymentById } = useAuthContext();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPayment = async () => {
      setLoading(true);
      setError("");
      const data = await fetchPaymentById(id);
      if (data?.success === false) {
        setError(data.message || "Failed to load invoice.");
        setPayment(null);
      } else {
        setPayment(data);
      }
      setLoading(false);
    };
    if (id) loadPayment();
  }, [fetchPaymentById, id]);

  const invoiceNumber = useMemo(() => {
    if (!payment) return "-";
    return payment?.invoice_number || payment?.invoice_no || `INV-${payment.id}`;
  }, [payment]);

  const amount = useMemo(() => {
    const value = Number(payment?.amount ?? payment?.price ?? 0);
    return Number.isNaN(value) ? 0 : value;
  }, [payment]);

  const statusLabel = useMemo(() => {
    const status = String(payment?.status || payment?.payment_status || "").toLowerCase();
    if (["completed", "success", "paid", "verified"].includes(status) || payment?.payment_verified === true) return "Paid";
    if (["failed", "cancelled", "canceled"].includes(status)) return "Failed";
    return "Pending";
  }, [payment]);

  const statusCls = statusLabel === "Paid" ? "status-badge-success" : statusLabel === "Failed" ? "status-badge-error" : "status-badge-warning";

  const formatDate = (dateValue) => dateValue ? new Date(dateValue).toLocaleString() : "-";

  const InfoCell = ({ label, children }) => (
    <div className="p-4 bg-slate-50 rounded-lg">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">{label}</p>
      <div className="text-sm font-semibold text-slate-800">{children}</div>
    </div>
  );

  return (
    <div className="section-container">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Link to="/dashboard/transactions" className="text-slate-400 hover:text-slate-600 transition-colors">
              <FiArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Invoice</h1>
              <p className="text-sm text-slate-500">Transaction invoice details</p>
            </div>
          </div>
          <button type="button" onClick={() => window.print()}
            className="btn btn-ghost btn-sm gap-2 text-slate-600">
            <FiPrinter className="w-4 h-4" /> Print
          </button>
        </div>

        <div className="card-modern p-6 sm:p-8">
          {loading ? (
            <div className="space-y-4">
              <div className="skeleton-pulse h-6 w-40 rounded"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => <div key={i} className="skeleton-pulse h-20 rounded-lg"></div>)}
              </div>
            </div>
          ) : error ? (
            <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</div>
          ) : payment ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoCell label="Invoice No">{invoiceNumber}</InfoCell>
                <InfoCell label="Transaction ID">
                  <span className="break-all">{payment?.transaction_id || payment?.tran_id || `TXN-${payment.id}`}</span>
                </InfoCell>
                <InfoCell label="Tuition">{payment?.tuition_title || payment?.tuition_name || "-"}</InfoCell>
                <InfoCell label="Status"><span className={statusCls}>{statusLabel}</span></InfoCell>
                <InfoCell label="Student">{payment?.student_email || payment?.payer_email || "-"}</InfoCell>
                <InfoCell label="Tutor">{payment?.tutor_email || "-"}</InfoCell>
              </div>

              <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-indigo-600 font-medium">Total Amount</p>
                  <p className="text-2xl font-bold text-indigo-700">{amount.toFixed(2)} BDT</p>
                </div>
                <p className="text-xs text-indigo-400 mt-2">Created: {formatDate(payment?.created_at)}</p>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 text-center py-8">Invoice not found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
