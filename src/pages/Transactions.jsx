import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import SectionHeader from "../components/ui/SectionHeader";
import { TableSkeleton } from "../components/ui/Skeleton";
import EmptyState from "../components/ui/EmptyState";
import { FiSearch, FiDollarSign, FiFileText } from "react-icons/fi";

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
        setPayments(data?.results || []);
      }
      setLoading(false);
    };
    loadPayments();
  }, [fetchMyPayments]);

  const parseAmount = (payment) => {
    const amount = Number(payment?.amount ?? 0);
    return Number.isNaN(amount) ? 0 : amount;
  };

  const isSuccessfulPayment = (payment) => {
    const status = String(payment?.status || payment?.payment_status || "").toLowerCase();
    if (["completed"].includes(status)) return true;
    return payment?.payment_verified === true;
  };

  const getStatusMeta = (payment) => {
    if (isSuccessfulPayment(payment)) return { label: "Paid", cls: "status-badge-success" };
    const status = String(payment?.status || payment?.payment_status || "").toLowerCase();
    if (["failed"].includes(status)) return { label: "Failed", cls: "status-badge-error" };
    return { label: "Pending", cls: "status-badge-warning" };
  };

  const filteredPayments = useMemo(() => {
    if (!searchTerm) return payments;
    const keyword = searchTerm.toLowerCase();
    return payments.filter((p) => {
      const tid = String(p?.transaction_id || "").toLowerCase();
      const title = String(p?.tuition_title || "").toLowerCase();
      const email = String(p?.student_email || "").toLowerCase();
      return tid.includes(keyword) || title.includes(keyword) || email.includes(keyword);
    });
  }, [payments, searchTerm]);

  const totalAmount = useMemo(() => {
    return payments.filter(isSuccessfulPayment).reduce((sum, p) => sum + parseAmount(p), 0);
  }, [payments]);

  const formatDate = (payment) => {
    const dateValue = payment?.paid_at || payment?.created_at || payment?.updated_at;
    if (!dateValue) return "-";
    return new Date(dateValue).toLocaleString();
  };

  const isTutor = user?.role === "Tutor";

  return (
    <div className="section-container">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Transaction History"
          description="View your payment transactions and print invoice details."
        />

        <div className="card-modern p-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <FiDollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                {isTutor ? "Overall Earnings" : "Total Paid"}
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {totalAmount.toFixed(2)} <span className="text-sm text-slate-400">BDT</span>
              </p>
            </div>
          </div>
        </div>

        <div className="card-modern">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <h2 className="text-base font-semibold text-slate-800">Transactions</h2>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search transactions..." className="input input-bordered input-sm pl-9 w-full md:w-72"
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            {loading ? (
              <TableSkeleton rows={4} cols={5} />
            ) : error ? (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead><tr>
                    <th>Transaction</th><th>Tuition</th><th>Amount</th><th>Status</th><th>Date</th><th></th>
                  </tr></thead>
                  <tbody>
                    {filteredPayments.map((payment) => {
                      const meta = getStatusMeta(payment);
                      const txnId = payment?.transaction_id || payment?.tran_id || `TXN-${payment.id}`;
                      return (
                        <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="font-medium text-slate-800 text-sm">{txnId}</td>
                          <td className="text-slate-600 text-sm">{payment?.tuition_title || "-"}</td>
                          <td className="text-slate-700 text-sm font-medium">{parseAmount(payment).toFixed(2)} BDT</td>
                          <td><span className={meta.cls}>{meta.label}</span></td>
                          <td className="text-slate-500 text-xs">{formatDate(payment)}</td>
                          <td>
                            <Link to={`/dashboard/transactions/${payment.id}/invoice`}
                              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
                              <FiFileText className="w-3.5 h-3.5" /> Invoice
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredPayments.length === 0 && (
                  <EmptyState icon={FiDollarSign} title="No transactions" description="No transactions found matching your search." />
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
