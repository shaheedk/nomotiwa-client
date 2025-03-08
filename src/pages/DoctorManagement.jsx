import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, UserCheck } from 'lucide-react';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance.js';

function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axiosInstance.get('api/hospital/doctors');
        console.log(data)
        setDoctors(data);
      } catch (error) {
        toast.error('Failed to fetch doctors');
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post('api/hospital/doctors', {
        name: formData.name,
        specialization: formData.specialization,
      });
  
      setDoctors([...doctors, data]); 
      toast.success('Doctor added successfully');
      setShowForm(false);
      setFormData({ name: '', specialization: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add doctor');
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Doctor
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Specialization</label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {doctors.map((doctor) => (
            <li key={doctor._id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.specialization}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400 hover:text-gray-500">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button className={`${doctor.availability ? 'text-green-500' : 'text-gray-400'} hover:text-green-600`}>
                    <UserCheck className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DoctorManagement;
