import Link from 'next/link';
import { FaHome, FaNewspaper, FaDatabase, FaUpload, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <h1 className="text-2xl font-semibold text-center mb-5">SPEED</h1>
      <nav>
        <Link href="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaHome className="inline-block mr-2" /> Dashboard
        </Link>
        <Link href="/articles" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaNewspaper className="inline-block mr-2" /> Articles
        </Link>
        <Link href="/database" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaDatabase className="inline-block mr-2" /> Database
        </Link>
        <Link href="/submissions" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaUpload className="inline-block mr-2" /> Submissions
        </Link>
      </nav>
      <div className="absolute bottom-0 w-full">
        <button className="block w-full py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          <FaSignOutAlt className="inline-block mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
}