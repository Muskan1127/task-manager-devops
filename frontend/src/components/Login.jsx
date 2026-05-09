import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, Lock, CheckSquare } from "lucide-react";

const inputCls = "w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

function Login() {
  const navigate = useNavigate();
  const url = "https://task-manager-backend-srzi.onrender.com";

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(url + "/api/user/login", data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("theme", "");
      navigate("/layout/allTasks");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 text-white p-3 rounded-2xl mb-3 shadow-lg shadow-indigo-200">
            <CheckSquare size={28} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your TaskManager account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-8">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="you@example.com" {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })} className={`${inputCls} ${errors.email ? "border-red-400 focus:ring-red-400" : ""}`} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" placeholder="••••••••" {...register("password", { required: "Password is required" })} className={`${inputCls} ${errors.password ? "border-red-400 focus:ring-red-400" : ""}`} />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Don't have an account?{" "}
            <NavLink to="/signUp" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
