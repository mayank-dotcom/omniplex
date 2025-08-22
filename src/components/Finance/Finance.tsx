"use client";

import React from "react";
import styles from "./Finance.module.css";

const Finance = () => {
  const handleMakePayment = () => {
   
    const makePayment = async () => {
      fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: [
            { id: "1", quantity: 1 },
            { id: "2", quantity: 1 },
          ]
        })
      }).then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ error: { message: 'Unknown error occurred' } }));
          throw new Error(errorData.error?.message || 'Payment failed');
        }
        return res.json();
      }).then(({ url }) => {
        console.log('Redirecting to:', url);
        window.location.href = url;
      }).catch((error) => {
        console.error('Payment error:', error);
        alert('Payment failed. Please try again.');
      })
    }
    makePayment();
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Finance</div>
      </div>
      <div className={styles.content}>
        <button className={styles.paymentButton} onClick={handleMakePayment}>
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default Finance;
