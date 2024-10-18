"use client";

import React, { useState } from "react";
import { Article } from "../Article";
import { useRouter } from "next/navigation";
import axios from "axios";

interface IProp {
  article?: Article;
}

const ModerateArticleCard = ({ article: initialArticle }: IProp) => {
  const [article, setArticle] = useState<Article | undefined>(initialArticle);
  const [showRejectionReason, setShowRejectionReason] = useState(false); // State to toggle rejection reason box
  const [rejectionReason, setRejectionReason] = useState(""); // State to capture rejection reason

  const router = useRouter();

  if (!article) {
    return null;
  }

  const updateStatus = (newStatus: string, reason?: string) => {
    if (article?._id) {
      // Update moderation_flag to true regardless of whether the article is moderated or rejected
      const moderationFlag = true; // Set to true for both moderation and rejection

      axios
        .put(
          process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/${article._id}`,
          {
            ...article,
            status: newStatus,
            rejection_reason: reason || article.rejection_reason, // Update rejection reason if provided
            moderation_flag: moderationFlag, // Set moderation_flag to true
          }
        )
        .then(() => {
          setArticle({
            ...article,
            status: newStatus,
            rejection_reason: reason,
            moderation_flag: moderationFlag,
          });
          console.log(`Article status updated to: ${newStatus}`);
        })
        .catch((err) => {
          console.error("Error updating article status", err);
        });
    }
  };

  const onClick = () => {
    router.push(`/moderate/${article._id}`);
  };

  return (
    <div className="card-container mb-4" onClick={onClick}>
      <div className="desc ml-4 mt-4">
        <h3 className="card-header">{article.title}</h3>
        <p className="mb-0">
          <b>Author: </b>
          {article.author}
        </p>
        <p className="mb-0">
          <b>DOI: </b>
          {article.doi}
        </p>
        <p className="mb-0">
          <b>Publication Year: </b>
          {article.publication_year}
        </p>
        <p>
          <b>Status: </b>
          {article.status}
        </p>
      </div>
      <div className="container d-flex mb-3 ml-1">
        {/* Button to set status to "Moderated" */}
        <button
          className="btn btn-success mr-2"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event
            updateStatus("Moderated"); // Update status to "Moderated" and set moderation_flag to true
          }}
        >
          Complete Moderation
        </button>

        {/* Button to show rejection reason box */}
        <button
          className="btn btn-danger"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event
            setShowRejectionReason(true); // Show rejection reason input
          }}
        >
          Reject
        </button>
      </div>

      {/* Conditional rendering of rejection reason box */}
      {showRejectionReason && (
        <div className="rejection-reason-box mt-3 ml-3 mb-2 mr-3">
          <textarea
            className="form-control"
            placeholder="Enter rejection reason"
            value={rejectionReason}
            onClick={(e) => e.stopPropagation()} // Prevent card click event
            onChange={(e) => setRejectionReason(e.target.value)}
          />
          <div className="mt-2">
            <button
              className="btn btn-danger mr-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                updateStatus("Rejected", rejectionReason); // Update status and reason
                setShowRejectionReason(false); // Hide rejection reason box
              }}
            >
              Submit Rejection
            </button>

            {/* Cancel button to hide rejection reason box */}
            <button
              className="btn btn-secondary"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                setShowRejectionReason(false); // Hide rejection reason box
                setRejectionReason(""); // Clear the rejection reason input
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModerateArticleCard;
