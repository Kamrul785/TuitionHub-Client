import React from 'react';
import { Link } from 'react-router';
import { FiXCircle, FiArrowRight } from 'react-icons/fi';

const PaymentFail = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="card-modern p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <FiXCircle className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-xl font-semibold text-slate-900 mb-2">Payment Failed</h1>
        <p className="text-sm text-slate-500 mb-6">
          Something went wrong with your payment. Please try again or contact support.
        </p>
        <Link
          to="/dashboard/my-enrollments"
          className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none w-full"
        >
          Back to Enrollments
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default PaymentFail;