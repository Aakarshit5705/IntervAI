import { useAuth } from "../context/AuthContext";
import { User, Mail } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="max-w-4xl mx-auto text-white">
      {/* Page Heading */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-slate-400 mt-1">
          Manage your personal information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-3xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
              {initials}
            </div>
            <span className="text-sm text-slate-400 mt-3">
              AI Interview Candidate
            </span>
          </div>

          {/* User Info */}
          <div className="flex-1 w-full">
            <div className="space-y-6">
              <InfoRow
                icon={<User size={18} />}
                label="Full Name"
                value={user?.name}
              />

              <InfoRow
                icon={<Mail size={18} />}
                label="Email Address"
                value={user?.email}
              />
            </div>

            <div className="mt-8 text-sm text-slate-400 leading-relaxed">
              Your profile is used to personalize interview questions and
              improve AI feedback accuracy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Reusable Row ---------------- */

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-lg font-medium text-white">{value}</p>
      </div>
    </div>
  );
}
