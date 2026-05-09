import React, { useState, useContext, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, ListChecks, CheckCircle2, Circle, TrendingUp } from "lucide-react";
import { taskContext } from "../App";
import AddTask from "./AddTask";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const {
    tasks, setTasks,
    pendingTasks, setPendingTasks,
    completedTasks, setCompletedTasks,
    loading, setLoading,
    setError, setUserName, setUserEmail, setImage, theme,
  } = useContext(taskContext);

  const [open, setOpen] = useState(false);
  const url = "https://task-manager-backend-srzi.onrender.com";

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(url + "/api/user/myDetails", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setUserName(response.data.user.name);
          setUserEmail(response.data.user.email);
          setImage(response.data.user?.imageUrl);
        }
      } catch (error) {
        setError("Error while fetching tasks");
      }
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setLoading(false); return; }
      try {
        const response = await axios.get(url + "/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          const fetched = response.data.tasks;
          setTasks(fetched);
          setCompletedTasks(fetched.filter((t) => t.completed));
          setPendingTasks(fetched.filter((t) => !t.completed));
        }
      } catch (error) {
        setError("Error while fetching tasks");
      }
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const completionRate = tasks.length > 0
    ? ((completedTasks.length / tasks.length) * 100).toFixed(0)
    : "0";

  const stats = [
    { label: "Total Tasks", value: loading ? "—" : tasks.length, icon: ListChecks, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
    { label: "Completed", value: loading ? "—" : completedTasks.length, icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "Pending", value: loading ? "—" : pendingTasks.length, icon: Circle, color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
    { label: "Completion Rate", value: loading ? "—" : `${completionRate}%`, icon: TrendingUp, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-950">
      <SideBar />

      <div className="lg:ml-[20%] w-full pt-14">
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage and track your tasks</p>
            </div>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm shadow-indigo-200 dark:shadow-indigo-900">
                  <Plus size={17} strokeWidth={2.5} /> Add Task
                </button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50 fixed inset-0 z-40 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl z-50 border border-gray-100 dark:border-slate-700">
                  <Dialog.Title className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                    New Task
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                    Fill in the details to create a new task.
                  </Dialog.Description>
                  <AddTask setOpen={setOpen} />
                  <Dialog.Close className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" aria-label="Close">
                    <Plus size={20} className="rotate-45" />
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {stats.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-700/60 shadow-sm">
                <div className={`inline-flex p-2 rounded-lg ${bg} mb-3`}>
                  <Icon size={18} className={color} />
                </div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Task List Area */}
        <div className="px-4 lg:px-6 pb-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
