import { Edit2, UserCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import axiosInstance from "../api/axiosInstance.js";

const TokenDisplay = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axiosInstance.get("api/hospital/doctors");
        setDoctors(data);
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };
    fetchDoctors();
  }, []);

  const incrementToken = async () => {
    if (!selectedDoctor) {
      toast.error("Please select a doctor first");
      return;
    }
    try {
      const response = await axiosInstance.post("api/token-management/increment-token", {
        doctorId: selectedDoctor,
      });
      setToken(response.data.token);
      toast.success("Token incremented successfully");
    } catch (error) {
      toast.error("Error incrementing token");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Select a Doctor</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {doctors.map((doctor) => (
            <li
              key={doctor._id}
              className={`px-6 py-4 cursor-pointer ${
                selectedDoctor === doctor._id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedDoctor(doctor._id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.specialization}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400 hover:text-gray-500">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    className={`${
                      doctor.availability ? "text-green-500" : "text-gray-400"
                    } hover:text-green-600`}
                  >
                    <UserCheck className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <button
          onClick={incrementToken}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Increment Token
        </button>
        {token && <p className="mt-2 text-lg font-semibold">Current Token: {token}</p>}
      </div>
    </div>
  );
};

export default TokenDisplay;
