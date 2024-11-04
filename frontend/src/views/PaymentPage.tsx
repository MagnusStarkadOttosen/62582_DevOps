// Some of the components in this file have been made with the help of AI
import React, { useState } from 'react';
import '../styles/PaymentPage.css';
import {useNavigate} from "react-router-dom";

// PaymentPage component
const PaymentPage: React.FC = () => {
    // State for billing information
    const [billingInfo, setBillingInfo] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        streetAddress: '',
        addressLine2: '',
        postcode: '',
        city: '',
        country: 'Denmark', // Default to Denmark
    });

    // State for payment method and details
    const [paymentMethod, setPaymentMethod] = useState('creditCard'); // Default method
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        mobilePayPhoneNumber: '',
    });

    const navigate = useNavigate();

    // Update billing information on input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillingInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    // Update payment method and reset details
    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
        setPaymentDetails({ cardNumber: '', expiryDate: '', cvv: '', mobilePayPhoneNumber: '' });
    };

    // Update payment details on input change
    const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form data
        console.log('Billing Information:', billingInfo);
        console.log('Selected Payment Method:', paymentMethod);
        console.log('Payment Details:', paymentDetails);
        navigate('/receipt', { state: { billingInfo, paymentMethod, paymentDetails } });
    };

    return (
        <div className="payment-page">
            <h1>Payment Page</h1>
            <form onSubmit={handleSubmit} className="payment-form">
                {/* Billing Information Section */}
                <div className="form-box">
                    <h2>Billing Information</h2>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            name="fullName"
                            value={billingInfo.fullName}
                            onChange={handleInputChange}
                            placeholder="Hans Hansen"
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={billingInfo.email}
                            onChange={handleInputChange}
                            placeholder="hans@hansen.com"
                            required
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={billingInfo.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="+xx xxxxxxxx"
                            required
                        />
                    </label>
                </div>

                {/* Billing Address Section */}
                <div className="form-box">
                    <h2>Billing Address</h2>
                    <label>
                        Street Address:
                        <input
                            type="text"
                            name="streetAddress"
                            value={billingInfo.streetAddress}
                            onChange={handleInputChange}
                            placeholder="Lautrupvang 15"
                            required
                        />
                    </label>
                    <label>
                        Address Line 2 (Optional):
                        <input
                            type="text"
                            name="addressLine2"
                            value={billingInfo.addressLine2}
                            onChange={handleInputChange}
                            placeholder="1. tv"
                        />
                    </label>
                    <label>
                        Postcode:
                        <input
                            type="text"
                            name="postcode"
                            value={billingInfo.postcode}
                            onChange={handleInputChange}
                            placeholder="2750"
                            required
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={billingInfo.city}
                            onChange={handleInputChange}
                            placeholder="Ballerup"
                            required
                        />
                    </label>
                    <label>
                        Country:
                        <input
                            type="text"
                            name="country"
                            value={billingInfo.country}
                            readOnly // Country is fixed to Denmark
                        />
                    </label>
                </div>

                {/* Payment Method Section */}
                <div className="form-box">
                    <h2>Payment Method</h2>
                    <div className="payment-options">
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="creditCard"
                                checked={paymentMethod === 'creditCard'}
                                onChange={handlePaymentMethodChange}
                                required
                            />
                            Credit Card
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="mobilePay"
                                checked={paymentMethod === 'mobilePay'}
                                onChange={handlePaymentMethodChange}
                                required
                            />
                            MobilePay
                        </label>
                    </div>

                    {paymentMethod === 'creditCard' && (
                        <>
                            <label>
                                Card Number:
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={paymentDetails.cardNumber}
                                    onChange={handlePaymentDetailsChange}
                                    placeholder="xxxx xxxx xxxx xxxx"
                                    required
                                />
                            </label>
                            <label>
                                Expiry Date:
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={paymentDetails.expiryDate}
                                    onChange={handlePaymentDetailsChange}
                                    placeholder="MM/YY"
                                    required
                                />
                            </label>
                            <label>
                                CVV:
                                <input
                                    type="text"
                                    name="cvv"
                                    value={paymentDetails.cvv}
                                    onChange={handlePaymentDetailsChange}
                                    placeholder="xxx"
                                    required
                                />
                            </label>
                        </>
                    )}

                    {paymentMethod === 'mobilePay' && (
                        <label>
                            Phone Number:
                            <input
                                type="text"
                                name="mobilePayPhoneNumber"
                                value={paymentDetails.mobilePayPhoneNumber}
                                onChange={handlePaymentDetailsChange}
                                placeholder="+xx xxxxxxxx"
                                required
                            />
                        </label>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="continue-button">Proceed</button>
            </form>
        </div>
    );
};

export default PaymentPage;
