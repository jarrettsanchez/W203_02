"use client";

import React, { useState } from 'react';
import Homepage from "./components/Homepage/Homepage";
import Review from "./components/Review/review";

export default function Page() {
  const [showReview, setShowReview] = useState(false); // State to toggle the view

  // Function to handle button click to show the Review component
  const handleShowReview = () => setShowReview(true);

  // Function to navigate back to Homepage
  const handleShowHomepage = () => setShowReview(false);

  return (
    <main>
      <div>
        {/* Conditionally render based on the state */}
        {showReview ? (
          <>
            <Review />
            {/* Optionally, add a button to navigate back */}
            <button onClick={handleShowHomepage}>Back to Homepage</button>
          </>
        ) : (
          <>
            <Homepage />
            {/* Add a button to toggle to the Review component */}
            <button onClick={handleShowReview}>Go to Review</button>
          </>
        )}
      </div>
    </main>
  );
}
