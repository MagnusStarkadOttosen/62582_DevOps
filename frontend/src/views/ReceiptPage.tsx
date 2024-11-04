// Some of the components in this file have been made with the help of AI
import React from 'react';
import '../styles/ReceiptPage.css';
import { useLocation } from 'react-router-dom';

const ReceiptPage: React.FC = () => {
    const location = useLocation();
    const { billingInfo, paymentMethod, paymentDetails } = location.state || {};

    return (
        <div className="receipt-page">
            <h1>Receipt</h1>

            {/* Billing Information Section */}
            <div className="receipt-section">
                <h2>Billing Information</h2>
                <p><strong>Full Name:</strong> {billingInfo?.fullName || 'N/A'}</p>
                <p><strong>Email:</strong> {billingInfo?.email || 'N/A'}</p>
                <p><strong>Phone Number:</strong> {billingInfo?.phoneNumber || 'N/A'}</p>
                <p><strong>Street Address:</strong> {billingInfo?.streetAddress || 'N/A'}</p>
                <p><strong>Address Line 2:</strong> {billingInfo?.addressLine2 || 'N/A'}</p>
                <p><strong>Postcode:</strong> {billingInfo?.postcode || 'N/A'}</p>
                <p><strong>City:</strong> {billingInfo?.city || 'N/A'}</p>
                <p><strong>Country:</strong> {billingInfo?.country || 'N/A'}</p>
            </div>

            {/* Payment Information Section */}
            <div className="receipt-section">
                <h2>Payment Information</h2>
                <p><strong>Payment Method:</strong> {paymentMethod}</p>
                {paymentMethod === 'creditCard' ? (
                    <>
                        <p><strong>Card Number:</strong> {paymentDetails?.cardNumber || 'N/A'}</p>
                        <p><strong>Expiry Date:</strong> {paymentDetails?.expiryDate || 'N/A'}</p>
                    </>
                ) : (
                    <p><strong>MobilePay Phone Number:</strong> {paymentDetails?.mobilePayPhoneNumber || 'N/A'}</p>
                )}
            </div>

            {/* Thank You Message */}
            <div className="thank-you-message">
                <h3>Thank you for your payment!</h3>
                <p>Your transaction has been processed successfully.</p>
            </div>
        </div>
    );
};

export default ReceiptPage;