'use client';

import { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

type Article = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
};

export default function ModeratePage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // TODO: Fetch articles pending moderation
    // This is a mock implementation
    setArticles([
      { id: '1', title: 'Article 1', authors: 'Author 1', journal: 'Journal 1', year: 2021 },
      { id: '2', title: 'Article 2', authors: 'Author 2', journal: 'Journal 2', year: 2022 },
    ]);
  }, []);

  const handleModeration = (id: string, action: 'approve' | 'reject') => {
    // TODO: Implement API call for moderation
    console.log(`Article ${id} ${action}d`);
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Moderate Articles</h1>
      <div className="space-y-4">
        {articles.map(article => (
          <div key={article.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p>Authors: {article.authors}</p>
            <p>Journal: {article.journal}</p>
            <p>Year: {article.year}</p>
            <div className="mt-2">
              <button
                onClick={() => handleModeration(article.id, 'approve')}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
              >
                <FaCheck className="inline-block mr-2" /> Approve
              </button>
              <button
                onClick={() => handleModeration(article.id, 'reject')}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                <FaTimes className="inline-block mr-2" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}