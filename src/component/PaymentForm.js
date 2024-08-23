// src/component/PaymentForm.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import data from "./data.json";

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { duration, mentorSelected } = location.state || {};

  // Handle missing duration
  if (!duration) {
    return <p>Invalid session details.</p>;
  }

  // Find the selected mentor's name
  const selectedMentor = data.mentors.find((m) => m.id === mentorSelected);

  const durationCost = {
    30: 2000,
    45: 3000,
    60: 4000,
  };

  // Calculate costs
  const basePrice = durationCost[duration] || 0; // Default to 0 if duration is invalid
  const additionalCharge = mentorSelected ? 1000 : 0;
  const totalPrice = basePrice + additionalCharge;

  // Handle payment process
  const handlePayment = () => {
    const confirmed = window.confirm(
      `You are about to pay INR ${totalPrice}. Do you want to proceed?`
    );
    if (confirmed) {
      alert("Proceeding to payment");
      // Implement payment gateway integration here
      navigate("/success"); // Navigate to success page after payment
    }
  };

  return (
    <div>
      <h1>Payment Summary</h1>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount (INR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Session Duration ({duration} mins)</td>
            <td>{basePrice}</td>
          </tr>
          {mentorSelected && (
            <>
              <tr>
                <td>Mentor</td>
                <td>{selectedMentor ? selectedMentor.name : "Unknown"}</td>
              </tr>
              <tr>
                <td>Additional Charge for Preferred Mentor</td>
                <td>{additionalCharge}</td>
              </tr>
            </>
          )}
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <strong>{totalPrice}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default PaymentForm;
