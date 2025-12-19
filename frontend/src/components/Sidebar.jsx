import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Upload,
  User,
  Info,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Sidebar() {
  const { user, logout,loading } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${isActive ? "bg-cyan-500/20 text-cyan-400" : "text-slate-300 hover:bg-slate-700/40"}`;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen bg-slate-900 p-6 flex flex-col">
      {/* User */}
      <div className="mb-8">
        <p className="text-slate-400 text-sm">Welcome</p>
        <p className="text-lg font-semibold text-white">{user?.name}</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        <NavLink to="/profile" className={linkClass}>
          <User size={18} /> Profile
        </NavLink>
        <NavLink to="/" className={linkClass}>
          <Home size={18} /> Dashboard
        </NavLink>

        <NavLink to="/upload" className={linkClass}>
          <Upload size={18} /> Upload Resume
        </NavLink>

        <NavLink to="/about" className={linkClass}>
          <Info size={18} /> About Platform
        </NavLink>

        <NavLink to="/help" className={linkClass}>
          <HelpCircle size={18} /> Help & Support
        </NavLink>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
