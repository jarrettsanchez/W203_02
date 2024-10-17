import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <FaSearch size={16} />
      </span>
    </div>
  );
}