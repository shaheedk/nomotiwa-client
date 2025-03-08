import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Ticket, UserCircle } from 'lucide-react';

function Dashboard() {

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Hospital Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">temp user</span>
              <button
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/doctors"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Doctor Management</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add and manage hospital doctors
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/tokens"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Ticket className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Token Booking</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Book and manage patient tokens
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/profile"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserCircle className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Staff Profile</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    View and update your profile
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;