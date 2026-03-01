import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

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

    if (id) {
      loadPayment();
    }
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
    if (["completed", "success", "paid", "verified"].includes(status) || payment?.payment_verified === true) {
      return "Paid";
    }
    if (["failed", "cancelled", "canceled"].includes(status)) {
      return "Failed";
    }
    return "Pending";
  }, [payment]);

  const getStatusBadge = () => {
    if (statusLabel === "Paid") return "badge badge-success";
    if (statusLabel === "Failed") return "badge badge-error";
    return "badge badge-warning";
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";
    return new Date(dateValue).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Invoice</h1>
            <p className="text-slate-600 mt-1">Transaction invoice details</p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn btn-outline" onClick={() => window.print()}>
              Print
            </button>
            <Link to="/dashboard/transactions" className="btn btn-ghost">
              Back to Transactions
            </Link>
          </div>
        </div>

        <div className="card bg-white border border-slate-200 shadow-sm">
          <div className="card-body">
            {loading ? (
              <div className="flex items-center gap-2 text-slate-600">
                <span className="loading loading-spinner loading-sm"></span>
                Loading invoice...
              </div>
            ) : error ? (
              <div className="alert alert-error text-sm">{error}</div>
            ) : payment ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Invoice No</p>
                    <p className="text-lg font-semibold text-slate-800">{invoiceNumber}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Transaction ID</p>
                    <p className="text-lg font-semibold text-slate-800 break-all">
                      {payment?.transaction_id || payment?.tran_id || `TXN-${payment.id}`}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Tuition</p>
                    <p className="text-lg font-semibold text-slate-800">
                      {payment?.tuition_title || payment?.tuition_name || "-"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Status</p>
                    <span className={getStatusBadge()}>{statusLabel}</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Student Email</p>
                    <p className="text-lg font-semibold text-slate-800">
                      {payment?.student_email || payment?.payer_email || "-"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm text-slate-500">Tutor Email</p>
                    <p className="text-lg font-semibold text-slate-800">
                      {payment?.tutor_email || "-"}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <p className="text-sm text-slate-500">Amount</p>
                    <p className="text-2xl font-bold text-slate-900">{amount.toFixed(2)} BDT</p>
                  </div>
                  <div className="mt-3 text-sm text-slate-500">
                    <p>Created: {formatDate(payment?.created_at)}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-slate-500">Invoice not found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
