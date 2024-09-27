'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaClipboardList, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

type SEPractice = {
  name: string;
  claimsCount: number;
};

type RecentSubmission = {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
};

export default function DashboardPage() {
  const [sePractices, setSEPractices] = useState<SEPractice[]>([]);
  const [recentSubmissions, setRecentSubmissions] = useState<RecentSubmission[]>([]);

  useEffect(() => {
    // TODO: Fetch actual data from your API
    setSEPractices([
      { name: 'TDD', claimsCount: 15 },
      { name: 'Pair Programming', claimsCount: 10 },
      { name: 'Code Review', claimsCount: 20 },
    ]);

    setRecentSubmissions([
      { id: '1', title: 'Impact of TDD on Code Quality', status: 'pending' },
      { id: '2', title: 'Effectiveness of Pair Programming', status: 'approved' },
      { id: '3', title: 'Code Review Best Practices', status: 'rejected' },
    ]);
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">SPEED Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Search</h2>
          <div className="flex">
            <input
              type="text"
              placeholder="Search SE practices or claims..."
              className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Top SE Practices</h2>
          <ul className="space-y-2">
            {sePractices.map((practice) => (
              <li key={practice.name} className="flex justify-between items-center">
                <span>{practice.name}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {practice.claimsCount} claims
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
          <ul className="space-y-2">
            {recentSubmissions.map((submission) => (
              <li key={submission.id} className="flex justify-between items-center">
                <span>{submission.title}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {submission.status === 'pending' && <FaClipboardList size={12} />}
                  {submission.status === 'approved' && <FaCheckCircle size={12} />}
                  {submission.status === 'rejected' && <FaTimesCircle size={12} />}
                  {submission.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}