import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const Transactions = () => {
  const { user, fetchMyPayments } = useAuthContext();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadPayments = async () => {
      setLoading(true);
      setError("");

      const data = await fetchMyPayments();
      if (data?.success === false) {
        setError("Failed to fetch transactions.");
        setPayments([]);
      } else { 
        const paymentList = data?.results || [];
        setPayments(paymentList);
      }

      setLoading(false);
    };

    loadPayments();
  }, [fetchMyPayments]);

  const parseAmount = (payment) => {
    const amount = Number(payment?.amount ??  0);
    return Number.isNaN(amount) ? 0 : amount;
  };

  const isSuccessfulPayment = (payment) => {
    const status = String(payment?.status || payment?.payment_status || "").toLowerCase();
    if (["completed"].includes(status)) {
      return true;
    }
    return payment?.payment_verified === true;
  };

  const getStatusMeta = (payment) => {
    if (isSuccessfulPayment(payment)) {
      return { label: "Paid", className: "badge badge-success" };
    }

    const status = String(payment?.status || payment?.payment_status || "").toLowerCase();
    if (["failed"].includes(status)) {
      return { label: "Failed", className: "badge badge-error" };
    }

    return { label: "Pending", className: "badge badge-warning" };
  };

  const filteredPayments = useMemo(() => {
    if (!searchTerm) return payments;
    const keyword = searchTerm.toLowerCase();

    return payments.filter((payment) => {
      const transactionId = String(
        payment?.transaction_id || "",
      ).toLowerCase();
      const tuitionTitle = String(
        payment?.tuition_title  || "",
      ).toLowerCase(); 
      const studentEmail = String(payment?.student_email || "").toLowerCase();
      return (
        transactionId.includes(keyword) ||
        tuitionTitle.includes(keyword) ||
        studentEmail.includes(keyword)
      );
    });
  }, [payments, searchTerm]);

  const totalTutorEarnings = useMemo(() => {
    if (user?.role !== "Tutor") return 0;
    return payments
      .filter(isSuccessfulPayment)
      .reduce((sum, payment) => sum + parseAmount(payment), 0);
  }, [payments, user?.role]);

  const totalStudentPaid = useMemo(() => {
    if (user?.role !== "User") return 0;
    return payments
      .filter(isSuccessfulPayment)
      .reduce((sum, payment) => sum + parseAmount(payment), 0);
  }, [payments, user?.role]);

  const formatDate = (payment) => {
    const dateValue = payment?.paid_at || payment?.created_at || payment?.updated_at;
    if (!dateValue) return "-";
    return new Date(dateValue).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Transaction History</h1>
          <p className="text-slate-600 mt-1">
            View your payment transactions and print invoice details.
          </p>
        </div>

        {user?.role === "Tutor" && (
          <div className="card bg-white border border-slate-200 shadow-sm mb-4">
            <div className="card-body">
              <p className="text-sm text-slate-500">Overall Earnings</p>
              <p className="text-3xl font-bold text-emerald-600">
                {totalTutorEarnings.toFixed(2)} BDT
              </p>
              <p className="text-xs text-slate-500">Based on successful paid transactions</p>
            </div>
          </div>
        )}

        {user?.role === "User" && (
          <div className="card bg-white border border-slate-200 shadow-sm mb-4">
            <div className="card-body">
              <p className="text-sm text-slate-500">Total Paid</p>
              <p className="text-3xl font-bold text-blue-600">
                {totalStudentPaid.toFixed(2)} BDT
              </p>
              <p className="text-xs text-slate-500">Your successful payments</p>
            </div>
          </div>
        )}

        <div className="card bg-white border border-slate-200 shadow-sm">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-slate-800">Transactions</h2>
              <input
                type="text"
                placeholder="Search by transaction, tuition, student"
                className="input input-bordered input-sm w-full md:w-80"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            {loading ? (
              <div className="flex items-center gap-2 text-slate-600">
                <span className="loading loading-spinner loading-sm"></span>
                Loading transactions...
              </div>
            ) : error ? (
              <div className="alert alert-error text-sm">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="bg-slate-50">
                    <tr>
                      <th>Transaction</th>
                      <th>Tuition</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => {
                      const statusMeta = getStatusMeta(payment);
                      const transactionId =
                        payment?.transaction_id || payment?.tran_id || `TXN-${payment.id}`;

                      return (
                        <tr key={payment.id} className="hover:bg-slate-50">
                          <td className="font-medium text-slate-800">{transactionId}</td>
                          <td className="text-slate-700">
                            {payment?.tuition_title || payment?.tuition_name || "-"}
                          </td>
                          <td className="text-slate-700">{parseAmount(payment).toFixed(2)} BDT</td>
                          <td>
                            <span className={statusMeta.className}>{statusMeta.label}</span>
                          </td>
                          <td className="text-slate-500 text-sm">{formatDate(payment)}</td>
                          <td>
                            <Link
                              to={`/dashboard/transactions/${payment.id}/invoice`}
                              className="btn btn-outline btn-xs"
                            >
                              Invoice
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredPayments.length === 0 && (
                  <div className="text-center text-slate-500 py-6">
                    No transactions found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
