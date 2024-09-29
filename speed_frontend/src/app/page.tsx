'use client';

import { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { FaBell } from 'react-icons/fa';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('https://api.example.com/articles');
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('An error occurred while fetching articles. Please try again later.');
      console.error('Error fetching articles:', err);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="flex justify-between items-center p-4 bg-white border-b">
        <h1 className="text-2xl font-semibold">Articles Page</h1>
        <div className="flex items-center">
        <span className="text-gray-600 mr-4">
            <FaBell size={20} />
          </span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Logout</button>
        </div>
      </header>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">All Articles</h2>
          <SearchBar />
          {isLoading ? (
            <p>Loading articles...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <ArticleList articles={articles} />
              <Pagination currentPage={1} totalPages={5} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}