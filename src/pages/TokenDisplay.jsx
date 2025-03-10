import { Edit2, UserCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
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
    <div className="min-h-screen bg-teal-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Select a Doctor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className={`p-4 bg-white shadow-lg rounded-lg cursor-pointer transition duration-200 hover:shadow-xl flex items-center justify-between ${
              selectedDoctor === doctor._id ? "border-2 border-teal-500" : ""
            }`}
            onClick={() => setSelectedDoctor(doctor._id)}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-sm text-gray-500">{doctor.specialization}</p>
            </div>
            <div className="flex items-center space-x-3">
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
        ))}
      </div>

      <div className="mt-6 w-full flex flex-col items-center">
        <button
          onClick={incrementToken}
          className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
        >
          Increment Token
        </button>
        {token && <p className="mt-3 text-lg font-semibold text-gray-700">Current Token: {token}</p>}
      </div>
    </div>
  );
};

export default TokenDisplay;
