'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

type Article = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
};

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  useEffect(() => {
    // TODO: Fetch all articles
    setArticles([
      { id: '1', title: 'Article 1', authors: 'Author 1', journal: 'Journal 1', year: 2021 },
      { id: '2', title: 'Article 2', authors: 'Author 2', journal: 'Journal 2', year: 2022 },
    ]);
  }, []);

  const handleEdit = (article: Article) => {
    setEditingArticle({ ...article });
  };

  const handleSave = () => {
    if (editingArticle) {
      // TODO: Implement API call to save changes
      console.log('Saving changes:', editingArticle);
      setArticles(articles.map(a => (a.id === editingArticle.id ? editingArticle : a)));
      setEditingArticle(null);
    }
  };

  const handleCancel = () => {
    setEditingArticle(null);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement API call to delete article
    console.log('Deleting article:', id);
    setArticles(articles.filter(a => a.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingArticle) {
      setEditingArticle({ ...editingArticle, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Authors</th>
            <th className="border p-2">Journal</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="border p-2">
                {editingArticle?.id === article.id ? (
                  <input
                    name="title"
                    value={editingArticle.title}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  article.title
                )}
              </td>
              <td className="border p-2">
                {editingArticle?.id === article.id ? (
                  <input
                    name="authors"
                    value={editingArticle.authors}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  article.authors
                )}
              </td>
              <td className="border p-2">
                {editingArticle?.id === article.id ? (
                  <input
                    name="journal"
                    value={editingArticle.journal}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  article.journal
                )}
              </td>
              <td className="border p-2">
                {editingArticle?.id === article.id ? (
                  <input
                    name="year"
                    type="number"
                    value={editingArticle.year}
                    onChange={handleChange}
                    className="w-full p-1 border rounded"
                  />
                ) : (
                  article.year
                )}
              </td>
              <td className="border p-2">
                {editingArticle?.id === article.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                    >
                      <span className="inline mr-1">
                      <FaSave size={16} />
                    </span>
                    Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      <span className="inline mr-1">
                      <FaTimes size={16} />
                    </span> 
                    Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(article)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      <span className="inline mr-1">
                      <FaEdit size={16} />
                    </span> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                    <span className="inline mr-1">
                      <FaTrash size={16} />
                    </span>
                     Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}