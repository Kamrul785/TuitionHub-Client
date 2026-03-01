import React from "react";
import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div>
      payment success return to{" "}
      <span className="btn btn-primary">
        <Link to="/dashboard/my-enrollments">Enrollment</Link>
      </span>
    </div>
  );
};

export default PaymentSuccess;
