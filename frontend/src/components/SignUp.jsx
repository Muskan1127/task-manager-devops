import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ContactRound, Mail, Lock, CheckSquare } from "lucide-react";

const inputCls = "w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

const SignUp = () => {
  const navigate = useNavigate();
  const url = "https://task-manager-backend-srzi.onrender.com";
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const handleSignUp = async (data) => {
    try {
      const response = await axios.post(url + "/api/user/signUp", data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("theme", "");
      navigate("/layout");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 text-white p-3 rounded-2xl mb-3 shadow-lg shadow-indigo-200">
            <CheckSquare size={28} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create account</h1>
          <p className="text-sm text-gray-500 mt-1">Start managing your tasks today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-8">
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Name</label>
              <div className="relative">
                <ContactRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Your name" {...register("name", { required: "Name is required" })} className={`${inputCls} ${errors.name ? "border-red-400" : ""}`} />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="you@example.com" {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })} className={`${inputCls} ${errors.email ? "border-red-400" : ""}`} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="password" placeholder="Min. 8 characters" {...register("password", { required: "Password is required", minLength: { value: 8, message: "At least 8 characters" } })} className={`${inputCls} ${errors.password ? "border-red-400" : ""}`} />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2">
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {isSubmitting && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-gray-400">Setting up your dashboard...</p>
            </div>
          )}

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <NavLink to="/login" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
