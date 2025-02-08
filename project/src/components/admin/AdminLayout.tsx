import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator, FileText, LogOut, Settings, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/admin" className="flex items-center">
                <Calculator className="h-8 w-8 text-[#2B9EB3]" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Admin Dashboard
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#2B9EB3] hover:bg-[#238999] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B9EB3]"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full lg:w-64">
              <nav className="space-y-1">
                <Link
                  to="/admin/posts"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-900 hover:text-[#2B9EB3] hover:bg-gray-50"
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Blog Posts
                </Link>
                <Link
                  to="/admin/users"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-900 hover:text-[#2B9EB3] hover:bg-gray-50"
                >
                  <Users className="h-5 w-5 mr-3" />
                  Users
                </Link>
                <Link
                  to="/admin/settings"
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-900 hover:text-[#2B9EB3] hover:bg-gray-50"
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </Link>
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;