import React, { useContext } from "react";
import { SquarePen, Trash2, Calendar, Lock } from "lucide-react";
import { taskContext } from "../App";
import { useNavigate, useLocation } from "react-router-dom";

const priorityConfig = {
  High:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Low:    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

const statusConfig = {
  completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  pending:   "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

const TaskCard = ({ task }) => {
  const { setTaskToEdit, setOpen, setConfirmDelete, setTaskToDelete, isGuest } = useContext(taskContext);
  const navigate = useNavigate();
  const location = useLocation();

  const requireAuth = () => {
    navigate("/login", { state: { from: location } });
  };

  const handleEdit = () => {
    if (isGuest) { requireAuth(); return; }
    setTaskToEdit(task);
    setOpen(true);
  };

  const handleDelete = () => {
    if (isGuest) { requireAuth(); return; }
    setTaskToDelete(task);
    setConfirmDelete(true);
  };

  return (
    <li className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700/60 rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex justify-between items-start gap-3 mb-2">
        <h2 className="text-base font-semibold text-gray-800 dark:text-white leading-snug">
          {task.title}
        </h2>
        <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${task.completed ? statusConfig.completed : statusConfig.pending}`}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${priorityConfig[task.priority] || priorityConfig.Low}`}>
            {task.priority}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Calendar size={11} />
            {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title={isGuest ? "Sign in to delete tasks" : "Delete"}
          >
            {isGuest ? <Lock size={14} className="text-gray-300 dark:text-gray-600" /> : <Trash2 size={15} />}
          </button>
          <button
            onClick={handleEdit}
            className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
            title={isGuest ? "Sign in to edit tasks" : "Edit"}
          >
            {isGuest ? <Lock size={14} className="text-gray-300 dark:text-gray-600" /> : <SquarePen size={15} />}
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
