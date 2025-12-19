import { FileText, Brain, MessageSquare, BarChart3 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning ☀️" : hour < 18 ? "Good afternoon 🌤️" : "Good evening 🌙";

  return (
    <div className="max-w-6xl mx-auto text-white">
      {/* ================= Greeting ================= */}
      <div className="mb-14">
        <h1 className="text-4xl font-bold tracking-tight">
          {greeting}
        </h1>
        <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">
          Welcome to your AI-powered interview preparation platform 🤖  
          Practice smarter, understand your strengths, and improve with
          real-time feedback — all in one place.
        </p>
      </div>

      {/* ================= Features ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-8 text-slate-200">
          🚀 What this platform helps you achieve
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<FileText />}
            emoji="📄"
            title="Resume Analysis"
            text="Upload your resume and let AI understand your skills, experience, and strengths."
          />

          <FeatureCard
            icon={<Brain />}
            emoji="🧠"
            title="AI Interview"
            text="Face adaptive interview questions tailored to your profile and experience level."
          />

          <FeatureCard
            icon={<MessageSquare />}
            emoji="💬"
            title="Answer Evaluation"
            text="Get instant feedback, scores, and improvement suggestions after every answer."
          />

          <FeatureCard
            icon={<BarChart3 />}
            emoji="📊"
            title="Final Interview Summary"
            text="Receive an overall performance summary with hiring recommendations."
          />
        </div>
      </div>

      {/* ================= Gentle Guidance ================= */}
      <div className="mt-16 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-2xl p-6">
        <p className="text-slate-300 leading-relaxed">
          ✨ <span className="font-semibold text-white">Getting started:</span>  
          Begin by uploading your resume. Once analyzed, you can start your
          AI interview and receive a detailed performance summary at the end.
        </p>
      </div>
    </div>
  );
}

/* ================= Feature Card ================= */

function FeatureCard({ icon, emoji, title, text }) {
  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 transition">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">
          {emoji} {title}
        </h3>
      </div>
      <p className="text-slate-400 leading-relaxed">{text}</p>
    </div>
  );
}
