import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Ticket, Calendar, User, Mail, Phone } from "lucide-react";
import axiosInstance from "../api/axiosInstance.js";

function TokenBooking() {
  const today = new Date().toISOString().split("T")[0];
  
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: "",
    date: today,
    patient: { name: "", email: "", phone: "" },
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await axiosInstance.get("api/hospital/doctors");
      setDoctors(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch doctors");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/api/hospital/doctors/${formData.doctorId}/tokens/book`,
        {
          patientInfo: formData.patient,
          date: formData.date,
        }
      );
      toast.success(`Token #${response.data.slot.tokenNumber} booked successfully`);
      setFormData({ doctorId: "", date: selectedDate, patient: { name: "", email: "", phone: "" } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to book token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <Ticket className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Book Your Token</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Date</label>
            <div className="relative mt-1">
              <Calendar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setFormData({ ...formData, date: e.target.value });
                }}
                min={today}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Doctor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
            <select
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id} disabled={!doctor.availability} className={!doctor.availability ? "text-gray-400" : ""}>
                  {doctor.name} - {doctor.specialization} {doctor.availability ? "" : "(Unavailable)"}
                </option>
              ))}
            </select>
          </div>

          {/* Patient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Name", icon: User, type: "text", key: "name" },
              { label: "Email", icon: Mail, type: "email", key: "email" },
              { label: "Phone", icon: Phone, type: "tel", key: "phone" },
            ].map(({ label, icon: Icon, type, key }) => (
              <div key={key} className={key === "phone" ? "col-span-2 md:col-span-1" : ""}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <div className="relative mt-1">
                  <Icon className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type={type}
                    value={formData.patient[key]}
                    onChange={(e) => setFormData({ ...formData, patient: { ...formData.patient, [key]: e.target.value } })}
                    className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-lg transition-all ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 text-white"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg className="animate-spin h-5 w-5 mr-2 border-2 border-white rounded-full border-t-transparent" viewBox="0 0 24 24"></svg>
                Booking...
              </div>
            ) : (
              "Book Token"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TokenBooking;
