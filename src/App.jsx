import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DoctorManagement from './pages/DoctorManagement';
import TokenBooking from './pages/TokenBooking';
import TokenDisplay from './pages/TokenDisplay';
import User from './pages/User';
const App = () => {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dummyuser" element={<User/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor-management" element={<DoctorManagement />} />
        <Route path="/token-booking" element={<TokenBooking />} />
        <Route path="/token-panel" element={<TokenDisplay/>} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
