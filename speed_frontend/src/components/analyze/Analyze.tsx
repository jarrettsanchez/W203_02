"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaSave, FaFilter } from "react-icons/fa";
import { filterArticles } from "./Filterarticle"; // Import the filtering function

type Article = {
  id: string;
  title: string;
  claim: string;
  evidence: string;
  status: "agree" | "disagree" | "none";
};

type Filters = {
  status: string;
  articleNameOrder: "asc" | "desc";
  claimType: "all" | "written" | "unwritten";
  evidenceType: "all" | "written" | "no-evidence";
};

export default function Analyze() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [claimThoughts, setClaimThoughts] = useState("");
  const [evidenceThoughts, setEvidenceThoughts] = useState("");
  const [evidenceResult, setEvidenceResult] = useState<
    "agree" | "disagree" | null
  >(null);
  const [filterVisible, setFilterVisible] = useState(false); // Toggle filter modal visibility
  const [filters, setFilters] = useState<Filters>({
    status: "",
    articleNameOrder: "asc",
    claimType: "all",
    evidenceType: "all",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch articles from API
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/articles/`)
      .then((response) => {
        setArticles(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Toggle Filter Modal
  const toggleFilterModal = () => {
    setFilterVisible(!filterVisible); // Toggle the modal visibility
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    setFilterVisible(false); // Close the filter modal
  };

  const handleFilterChange = (field: keyof Filters, value: string) => {
    if (field === "articleNameOrder") {
      setFilters({ ...filters, [field]: value as "asc" | "desc" });
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  // Handle the exit action
  const handleExit = () => {
    setSelectedArticle(null); // Clear selected article and show only article list
  };

  // Submit and update the analysis_flag
  const handleSubmit = () => {
    if (selectedArticle && evidenceResult) {
      const updateData = {
        claim: claimThoughts,
        evidence: evidenceThoughts,
        analysis_flag: evidenceResult, // This will either be 'agree' or 'disagree'
      };

      // Send PUT request to update the article
      axios
        .put(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            `/api/articles/${selectedArticle.id}`,
          updateData
        )
        .then((response) => {
          setSuccess("Analysis updated successfully.");
          setError(null);

          // Update the articles state to reflect the changes
          setArticles((prevArticles) =>
            prevArticles.map((article) =>
              article.id === selectedArticle.id
                ? { ...article, ...response.data }
                : article
            )
          );

          // Reset form and state after successful submission
          setSelectedArticle(null);
          setClaimThoughts("");
          setEvidenceThoughts("");
          setEvidenceResult(null);
        })
        .catch((err) => {
          setError("Failed to update analysis.");
          setSuccess(null);
          console.error(err);
        });
    } else {
      setError("Please select agree or disagree for the evidence result.");
    }
  };

  // Apply the filterArticles function to filter based on selected filters
  const filteredArticles = filterArticles(articles, filters);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Articles Analyst Page</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Articles List</h2>
            <button
              onClick={toggleFilterModal} // Show filter modal
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 -mt-6"
            >
              <FaFilter className="inline-block mr-2" />
              Filter
            </button>
          </div>

          {/* Display success or error messages */}
          {success && (
            <div className="bg-green-200 text-green-700 p-2 rounded mb-4">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-200 text-red-700 p-2 rounded mb-4">
              {error}
            </div>
          )}

          {/* Left side: List of articles */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="space-y-2">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className={`p-2 border rounded cursor-pointer ${
                      selectedArticle?.id === article.id ? "bg-blue-100" : ""
                    }`}
                    onClick={() => setSelectedArticle(article)} // Select an article
                  >
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm">Status: {article.status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Article details */}
            {selectedArticle && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Article Analysis</h2>
                <div className="border p-4 rounded">
                  <h3 className="text-lg font-bold mb-2">
                    {selectedArticle.title}
                  </h3>

                  {/* Claim Text Area */}
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Claim: </label>
                    <textarea
                      className="w-full h-24 p-2 border rounded"
                      value={claimThoughts}
                      onChange={(e) => setClaimThoughts(e.target.value)}
                      placeholder="Write your thoughts on the claim..."
                    />
                  </div>

                  {/* Evidence Text Area */}
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">
                      Evidence:
                    </label>
                    <textarea
                      className="w-full h-24 p-2 border rounded"
                      value={evidenceThoughts}
                      onChange={(e) => setEvidenceThoughts(e.target.value)}
                      placeholder="Write your thoughts on the evidence..."
                    />
                  </div>

                  {/* Evidence result (Agree/Disagree) */}
                  <div className="mt-4">
                    <h4 className="font-semibold">Evidence Result:</h4>
                    <div className="flex space-x-4">
                      <label>
                        <input
                          type="radio"
                          value="agree"
                          checked={evidenceResult === "agree"}
                          onChange={() => setEvidenceResult("agree")}
                        />
                        <span className="ml-2">Agree</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="disagree"
                          checked={evidenceResult === "disagree"}
                          onChange={() => setEvidenceResult("disagree")}
                        />
                        <span className="ml-2">Disagree</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit and Exit buttons */}
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={handleSubmit} // Submit the analysis
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      <FaSave className="inline-block mr-2" />
                      Submit
                    </button>
                    <button
                      onClick={handleExit} // Handle exit action
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Exit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Filter modal */}
            {filterVisible && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white p-6 rounded shadow-lg w-1/3">
                  <h2 className="text-xl font-bold mb-4">Filter Articles</h2>

                  {/* Filter by status */}
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Status:</label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    >
                      <option value="">All</option>
                      <option value="agree">Agreed</option>
                      <option value="disagree">Disagreed</option>
                      <option value="none">Pending</option>
                    </select>
                  </div>

                  {/* Filter by article name */}
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">
                      Article Name:
                    </label>
                    <select
                      value={filters.articleNameOrder}
                      onChange={(e) =>
                        handleFilterChange("articleNameOrder", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>

                  {/* Filter by claim */}
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">
                      Claim Type:
                    </label>
                    <select
                      value={filters.claimType}
                      onChange={(e) =>
                        handleFilterChange("claimType", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    >
                      <option value="all">All</option>
                      <option value="written">Written Claims</option>
                      <option value="unwritten">Unwritten Claims</option>
                    </select>
                  </div>

                  {/* Filter by evidence */}
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">
                      Evidence Type:
                    </label>
                    <select
                      value={filters.evidenceType}
                      onChange={(e) =>
                        handleFilterChange("evidenceType", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    >
                      <option value="all">All</option>
                      <option value="written">Written Evidence</option>
                      <option value="no-evidence">No Evidence</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => setFilterVisible(false)}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={applyFilters}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
