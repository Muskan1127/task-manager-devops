import React, { useState, useRef, useEffect } from "react";
import { CheckSquare, CircleUser, UserCog, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { taskContext } from "../App";

const Navbar = () => {
  const navigate = useNavigate();
  const menuref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { userName, userEmail } = useContext(taskContext);

  useEffect(() => {
    const handler = (e) => {
      if (menuref.current && !menuref.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    toast.success("Logged Out!");
    setMenuOpen(false);
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="fixed top-0 w-full z-30 bg-white border-b border-gray-200 dark:bg-slate-900 dark:border-slate-700/60 shadow-sm">
      <nav className="flex justify-between items-center h-14 px-4 lg:px-6 ml-0 lg:ml-[20%]">
        <NavLink to="/layout/allTasks" className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
            <CheckSquare size={18} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg text-gray-800 dark:text-white tracking-tight">
            TaskManager
          </span>
        </NavLink>

        <div ref={menuref} className="relative">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <CircleUser size={28} className="text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
              {userName}
            </span>
          </button>

          {menuOpen && (
            <div className="absolute top-12 right-0 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
              </div>
              <div className="p-1">
                <button
                  onClick={() => { setMenuOpen(false); navigate("/layout/profile"); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <UserCog size={16} /> Profile Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
