"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#232323',
      color: '#e8e8e6',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <div style={{
          fontSize: '72px',
          marginBottom: '20px'
        }}>
          ❌
        </div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#ef4444'
        }}>
          Payment Cancelled
        </h1>
        <p style={{
          fontSize: '18px',
          marginBottom: '32px',
          color: '#e8e8e6aa'
        }}>
          Your payment was cancelled. No charges have been made to your account.
        </p>
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2e2e2e',
              color: '#e8e8e6',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.25s ease-in-out'
            }}
          >
            Return to Home
          </button>
          <button
            onClick={() => router.back()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4ade80',
              color: '#000000',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.25s ease-in-out'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
