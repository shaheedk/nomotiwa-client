import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Ticket } from 'lucide-react';
import axiosInstance from '../api/axiosInstance.js';

function TokenBooking() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    patient: {
      name: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await axiosInstance.get('api/hospital/doctors');
      setDoctors(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch doctors');
    }
  };

  const handleDoctorChange = (e) => {
    setFormData({
      ...formData,
      doctorId: e.target.value
    });
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setFormData({
      ...formData,
      date: newDate
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `/api/hospital/doctors/${formData.doctorId}/tokens/book`,
        {
          patientInfo: formData.patient,
          date: formData.date
        }
      );
      
      toast.success(`Token #${response.data.slot.tokenNumber} booked successfully`);

      setFormData({
        doctorId: '',
        date: new Date().toISOString().split('T')[0],
        patient: {
          name: '',
          email: '',
          phone: '',
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-6">
        <Ticket className="h-8 w-8 text-indigo-600 mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">Book Token</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
            <select
              value={formData.doctorId}
              onChange={handleDoctorChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id} disabled={!doctor.availability}>
                  {doctor.name} - {doctor.specialization} {doctor.availability ? '' : '(Unavailable)'}
                </option>
              ))}
            </select>
          </div>

          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Patient Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.patient.name}
                onChange={(e) =>
                  setFormData({ ...formData, patient: { ...formData.patient, name: e.target.value } })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.patient.email}
                onChange={(e) =>
                  setFormData({ ...formData, patient: { ...formData.patient, email: e.target.value } })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={formData.patient.phone}
                onChange={(e) =>
                  setFormData({ ...formData, patient: { ...formData.patient, phone: e.target.value } })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Book Token'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TokenBooking;