'use client';

import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

type Article = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  sePractice: string;
  claim: string;
  result: 'agree' | 'disagree' | 'inconclusive';
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPractice, setSelectedPractice] = useState('');
  const [selectedClaim, setSelectedClaim] = useState('');

  useEffect(() => {
    // TODO: Fetch actual data from your API
    setArticles([
      {
        id: '1',
        title: 'Impact of TDD on Code Quality',
        authors: 'John Doe, Jane Smith',
        journal: 'Journal of Software Engineering',
        year: 2021,
        sePractice: 'TDD',
        claim: 'Improves code quality',
        result: 'agree',
      },
      {
        id: '2',
        title: 'Effectiveness of Pair Programming',
        authors: 'Alice Johnson, Bob Williams',
        journal: 'IEEE Software',
        year: 2020,
        sePractice: 'Pair Programming',
        claim: 'Increases productivity',
        result: 'disagree',
      },
      // Add more mock articles as needed
    ]);
  }, []);

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedPractice === '' || article.sePractice === selectedPractice) &&
    (selectedClaim === '' || article.claim === selectedClaim)
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">SPEED Articles</h1>
      
      <div className="mb-6 flex space-x-4">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <FaSearch size={16} />
            </span>
          </div>
        </div>
        <select
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedPractice}
          onChange={(e) => setSelectedPractice(e.target.value)}
        >
          <option value="">All Practices</option>
          <option value="TDD">TDD</option>
          <option value="Pair Programming">Pair Programming</option>
          {/* Add more SE practices as options */}
        </select>
        <select
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedClaim}
          onChange={(e) => setSelectedClaim(e.target.value)}
        >
          <option value="">All Claims</option>
          <option value="Improves code quality">Improves code quality</option>
          <option value="Increases productivity">Increases productivity</option>
          {/* Add more claims as options */}
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Authors</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SE Practice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredArticles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4 whitespace-nowrap">{article.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{article.authors}</td>
                <td className="px-6 py-4 whitespace-nowrap">{article.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">{article.sePractice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{article.claim}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    article.result === 'agree' ? 'bg-green-100 text-green-800' :
                    article.result === 'disagree' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}