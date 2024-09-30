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
  result: 'Approved' | 'Disapproved' | 'Pending';
  image: string;
};

// Helper function to validate and ensure the result type matches the expected union
const getValidatedResult = (result: string): 'Approved' | 'Disapproved' | 'Pending' => {
  if (result === 'Approved' || result === 'Disapproved' || result === 'Pending') {
    return result;
  }
  return 'Pending'; // Default value if result is not valid
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPractice, setSelectedPractice] = useState('');
  const [selectedClaim, setSelectedClaim] = useState('');

  useEffect(() => {
    // Fetch articles from localStorage or set initial data
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      const parsedArticles = JSON.parse(savedArticles);

      // Validate each article's result property
      const validatedArticles: Article[] = parsedArticles.map((article: any) => ({
        ...article,
        result: getValidatedResult(article.result),
      }));

      setArticles(validatedArticles);
    } else {
      const initialArticles: Article[] = [
        {
          id: '1',
          title: 'Impact of TDD on Code Quality',
          authors: 'John Doe, Jane Smith',
          journal: 'Journal of Software Engineering',
          year: 2021,
          sePractice: 'TDD',
          claim: 'Improves code quality',
          result: 'Approved',
          image: 'article1.jpg',


        },
        {
          id: '2',
          title: 'Effectiveness of Pair Programming',
          authors: 'Alice Johnson, Bob Williams',
          journal: 'IEEE Software',
          year: 2020,
          sePractice: 'Pair Programming',
          claim: 'Increases productivity',
          result: 'Disapproved',
          image: 'https://via.placeholder.com/300x200.png?text=Article+Image',
        },
      ];
      
      setArticles(initialArticles);
      localStorage.setItem('articles', JSON.stringify(initialArticles));
    }
  }, []);

  //Sort by options in dropdown box
  const handleSort = (a: Article, b: Article) => {
    if (selectedClaim === 'Title') {
      return a.title.localeCompare(b.title);
    }
    if (selectedClaim === 'Authors') {
      return a.authors.localeCompare(b.authors);
    }
    return 0;
  };

  

  const filteredArticles = [...articles]
    .filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedPractice === '' || article.sePractice === selectedPractice)
    )
    .sort(handleSort);

  const handleResultChange = (id: string) => {
    const updatedArticles = articles.map((article) =>
      article.id === id
        ? {
            ...article,
            result: getNextResult(article.result),
          }
        : article
    );
  
    setArticles(updatedArticles);
  
    // Try saving to localStorage with error handling
    try {
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    } catch (error) {
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        console.error("Storage quota exceeded! Unable to save articles.");
      } else {
        console.error("An error occurred while saving to localStorage:", error);
      }
    }
  };
  

  //Results 
  const getNextResult = (currentResult: 'Approved' | 'Disapproved' | 'Pending'): 'Approved' | 'Disapproved' | 'Pending' => {
    switch (currentResult) {
      case 'Approved':
        return 'Disapproved';
      case 'Disapproved':
        return 'Pending';
      case 'Pending':
        return 'Approved';
      default:
        return 'Pending';
    }
  };
  

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
          className="px-0 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <option value="">Sort By</option>
          <option value="Title">Title</option>
          <option value="Authors">Authors</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.authors}</p>
              <p className="mt-2 text-gray-700">{article.claim}</p>
              <div className="mt-4">
                {/* Status button styled as a label */}
                <span
                  onClick={() => handleResultChange(article.id)}
                  className={`cursor-pointer px-2 py-1 rounded-full text-xs ${
                    article.result === 'Approved' ? 'bg-green-100 text-green-800' :
                    article.result === 'Disapproved' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {article.result}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
