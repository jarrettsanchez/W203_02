'use client';

import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: '',
    volume: '',
    number: '',
    pages: '',
    doi: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to submit article
    console.log('Submitting article:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="authors"
          placeholder="Authors"
          value={formData.authors}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="journal"
          placeholder="Journal/Conference Name"
          value={formData.journal}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="volume"
            placeholder="Volume"
            value={formData.volume}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="number"
            placeholder="Number"
            value={formData.number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="pages"
            placeholder="Pages"
            value={formData.pages}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <input
          type="text"
          name="doi"
          placeholder="DOI"
          value={formData.doi}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        <span className="inline-block mr-2">
            <FaUpload size={16} />
          </span>
           Submit Article
        </button>
      </form>
    </div>
  );
}