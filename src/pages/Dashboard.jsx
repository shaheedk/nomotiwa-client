import React from "react";
import { Link } from "react-router-dom";
import { Users, Ticket, UserCircle } from "lucide-react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-100 to-teal-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-900">Hospital Management</h1>
          <div className="flex items-center space-x-6">
            <span className="text-gray-700 text-lg font-medium">Temp User</span>
            <Link to="/login" className="text-red-600 font-medium hover:text-red-800 transition">
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card Component */}
          <DashboardCard
            to="/doctors"
            icon={<Users className="h-10 w-10 text-indigo-600" />}
            title="Doctor Management"
            description="Add and manage hospital doctors"
          />

          <DashboardCard
            to="/tokens"
            icon={<Ticket className="h-10 w-10 text-green-600" />}
            title="Token Booking"
            description="Book and manage patient tokens"
          />

          <DashboardCard
            to="/token-panel"
            icon={<UserCircle className="h-10 w-10 text-purple-600" />}
            title="Token Panel"
            description="View and update your profile"
          />
        </div>
      </main>
    </div>
  );
}

// Reusable Card Component
const DashboardCard = ({ to, icon, title, description }) => (
  <Link
    to={to}
    className="bg-white rounded-2xl shadow-lg p-8 flex items-center space-x-6 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
  >
    <div className="p-4 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  </Link>
);

export default Dashboard;
