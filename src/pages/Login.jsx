import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  
  // Set default values for email and password
  const [email, setEmail] = useState("hospital@gmail.com");
  const [password, setPassword] = useState("1234");

  const predefinedEmail = "hospital@gmail.com";
  const predefinedPassword = "1234";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === predefinedEmail && password === predefinedPassword) {
      toast.success("User verified successfully");
      navigate("/dashboard"); // Change to your desired route
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-purple-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-6">
        <div className="flex flex-col items-center">
          <UserCircle className="h-16 w-16 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all focus:ring-2 focus:ring-indigo-400"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
