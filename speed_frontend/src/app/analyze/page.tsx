'use client';

import { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';

type Article = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
};

export default function AnalyzePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    // TODO: Fetch articles ready for analysis
    // This is a mock implementation
    setArticles([
      { id: '1', title: 'Article 1', authors: 'Author 1', journal: 'Journal 1', year: 2021 },
      { id: '2', title: 'Article 2', authors: 'Author 2', journal: 'Journal 2', year: 2022 },
    ]);
  }, []);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setAnalysis(''); // Reset analysis when a new article is selected
  };

  const handleAnalysisChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnalysis(e.target.value);
  };

  const handleSaveAnalysis = () => {
    if (selectedArticle && analysis) {
      // TODO: Implement API call to save analysis
      console.log(`Saving analysis for article ${selectedArticle.id}:`, analysis);
      // Reset after saving
      setSelectedArticle(null);
      setAnalysis('');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Analyze Articles</h1>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Articles for Analysis</h2>
          <div className="space-y-2">
            {articles.map(article => (
              <div
                key={article.id}
                className={`p-2 border rounded cursor-pointer ${
                  selectedArticle?.id === article.id ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleSelectArticle(article)}
              >
                <h3 className="font-semibold">{article.title}</h3>
                <p>{article.authors}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          {selectedArticle && (
            <>
              <h2 className="text-xl font-semibold mb-2">Analysis</h2>
              <textarea
                className="w-full h-48 p-2 border rounded"
                value={analysis}
                onChange={handleAnalysisChange}
                placeholder="Enter your analysis here..."
              />
              <button
                onClick={handleSaveAnalysis}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <FaSave className="inline-block mr-2" /> Save Analysis
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}