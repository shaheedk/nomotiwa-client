import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axiosInstance from "../api/axiosInstance.js";

const socket = io("https://nomotiwa-backend.onrender.com/");

function User() {
  const [doctorTokens, setDoctorTokens] = useState({});
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const { data } = await axiosInstance.get('api/hospital/doctors');
      setDoctors(data);
      
      const initialTokens = {};
      data.forEach(doctor => {
        initialTokens[doctor._id] = "Waiting...";
      });
      setDoctorTokens(initialTokens);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();

    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    doctors.forEach(doctor => {
        console.log(doctor)
      socket.emit("joinDoctorRoom", doctor._id);
    });

    socket.on("tokenUpdate", (data) => {
      console.log("Received token update:", data);
      if (data.doctorId && data.currentToken) {
        setDoctorTokens(prev => ({
          ...prev,
          [data.doctorId]: data.currentToken
        }));
      }
    });

    return () => {
      socket.off("tokenUpdate");
      doctors.forEach(doctor => {
        socket.emit("leaveDoctorRoom", doctor._id);
      });
    };
  }, [doctors]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Doctor's Token System</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div 
            key={doctor._id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Dr. {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {doctor.specialization}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-full p-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {doctorTokens[doctor._id]}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    doctorTokens[doctor._id] === "Waiting..." 
                      ? "bg-yellow-400" 
                      : "bg-green-400"
                  }`}></div>
                  <span className="text-sm text-gray-600">
                    {doctorTokens[doctor._id] === "Waiting..." 
                      ? "Waiting for token" 
                      : "Token Active"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;