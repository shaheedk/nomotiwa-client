import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("1234");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "user@gmail.com" && password === "1234") {
      toast.success("User verified successfully");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-200 px-4">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-md w-full space-y-6 border border-white/40">
        <div className="flex flex-col items-center">
          <UserCircle className="h-16 w-16 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Welcome Back</h2>
          <p className="text-gray-600 text-sm">Sign in to continue</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-800">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white/70 backdrop-blur-md placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-800">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white/70 backdrop-blur-md placeholder-gray-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute top-10 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all focus:ring-2 focus:ring-indigo-400 shadow-md"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
