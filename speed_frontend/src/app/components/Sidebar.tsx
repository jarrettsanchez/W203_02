'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaNewspaper, FaUpload, FaUserCog, FaDatabase, FaSignOutAlt } from 'react-icons/fa';

const NavItem = ({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`flex items-center space-x-3 py-2 px-4 rounded transition duration-200 ${
        isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">SPEED</h1>
      </div>
      <nav className="space-y-2">
        <NavItem href="/dashboard" icon={<FaHome className="text-lg" />}>Dashboard</NavItem>
        <NavItem href="/articles" icon={<FaNewspaper className="text-lg" />}>Articles</NavItem>
        <NavItem href="/submit" icon={<FaUpload className="text-lg" />}>Submit</NavItem>
        <NavItem href="/moderate" icon={<FaUserCog className="text-lg" />}>Moderate</NavItem>
        <NavItem href="/analyze" icon={<FaDatabase className="text-lg" />}>Analyze</NavItem>
        <NavItem href="/admin" icon={<FaUserCog className="text-lg" />}>Admin</NavItem>
      </nav>
      <div className="absolute bottom-4">
        <button className="flex items-center space-x-3 py-2 px-4 rounded transition duration-200 text-gray-300 hover:bg-gray-700 hover:text-white">
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}