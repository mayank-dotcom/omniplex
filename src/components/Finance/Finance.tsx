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
        <div className={styles.title}>Subscription Plans</div>
      </div>
      <div className={styles.content}>
        <div className={styles.subscriptionCard}>
          <div className={styles.cardHeader}>
            <div className={styles.planBadge}>RECOMMENDED</div>
            <h2 className={styles.planTitle}>Pro Plan</h2>
            <div className={styles.priceContainer}>
              <span className={styles.currency}>$</span>
              <span className={styles.price}>10</span>
              <span className={styles.period}>/month</span>
            </div>
          </div>
          
          <div className={styles.cardBody}>
            <ul className={styles.featureList}>
              <li className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                Unlimited AI conversations
              </li>
              <li className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                Advanced search capabilities
              </li>
              <li className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                Priority customer support
              </li>
              <li className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                Access to premium features
              </li>
              <li className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                No usage limits
              </li>
            </ul>
          </div>
          
          <div className={styles.cardFooter}>
            <button className={styles.subscribeButton} onClick={handleMakePayment}>
              Subscribe to Pro
            </button>
            <p className={styles.disclaimer}>
              Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
