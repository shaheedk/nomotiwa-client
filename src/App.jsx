import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DoctorManagement from './pages/DoctorManagement';
import TokenBooking from './pages/TokenBooking';
import TokenDisplay from './pages/TokenDisplay';
import User from './pages/User';
import Layout from './pages/Layout';

const App = () => {
  return (
    <div className='bg-teal-50'>
    <Router >
      <Toaster position="top-right" />
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Route (No Sidebar) */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (With Sidebar) */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/doctors" element={<DoctorManagement />} />
                <Route path="/tokens" element={<TokenBooking />} />
                <Route path="/token-panel" element={<TokenDisplay />} />
                <Route path="/dummyuser" element={<User />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
