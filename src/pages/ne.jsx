import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axiosInstance from "../api/axiosInstance.js";
import { BadgeCheck, UserCircle } from "lucide-react";

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
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">Doctor's Token System</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <div 
            key={doctor._id} 
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
          >
            <div className="p-6 flex flex-col items-center">
              <UserCircle className="h-16 w-16 text-indigo-500 mb-3" />
              <h3 className="text-2xl font-bold text-gray-800">Dr. {doctor.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{doctor.specialization}</p>
              
              <div className="mt-6 w-full flex justify-center">
                <div className="bg-blue-100 text-blue-600 px-6 py-3 rounded-full text-lg font-bold shadow-inner">
                  {doctorTokens[doctor._id]}
                </div>
              </div>
              
              <div className="flex items-center mt-6 pt-4 border-t border-gray-200 w-full justify-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    doctorTokens[doctor._id] === "Waiting..." 
                      ? "bg-yellow-400" 
                      : "bg-green-500"
                  }`}></div>
                  <span className="text-sm text-gray-600">
                    {doctorTokens[doctor._id] === "Waiting..." 
                      ? "Waiting for token" 
                      : "Token Active"}
                  </span>
                </div>
                {doctorTokens[doctor._id] !== "Waiting..." && (
                  <BadgeCheck className="h-5 w-5 text-green-500 ml-2" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
