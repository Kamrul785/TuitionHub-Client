import React from 'react';

const PaymentFail = () => {
    return (
        <div>
            Payment failed. Please try again. Return to{" "}
            <span className="btn btn-primary">
                <a href="/dashboard/my-enrollments">enrollments</a>
            </span>
        </div>
    );
};

export default PaymentFail;