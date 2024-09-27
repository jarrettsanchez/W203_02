"use client";


import React, { useState } from 'react';
import Homepage from "../components/Homepage/Homepage";
import Review from '../components/Review/review';
import './style.css';

export default function Page() {
  const [showReview, setShowReview] = useState(false); // State to toggle the view

  // Function to handle button click to show the Review component
  const handleShowReview = () => setShowReview(true);

  // Function to navigate back to Homepage
  const handleShowHomepage = () => setShowReview(false);

  return (
<main className="main-background">
      <div style={{ position: "relative" }}>
        {showReview ? (
          <>
            <Review />
            <button onClick={handleShowHomepage}>Back to Homepage</button>
          </>
        ) : (
          <>
            <Homepage />
            <button onClick={handleShowReview}>Go to Review</button>
          </>
        )}
      </div>
    </main>
  );
}
