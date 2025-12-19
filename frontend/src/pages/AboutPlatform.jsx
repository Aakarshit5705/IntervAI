import { Sparkles, Brain, ShieldCheck } from "lucide-react";

export default function AboutPlatform() {
  return (
    <div className="max-w-4xl mx-auto text-white">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">About the Platform</h1>
        <p className="text-slate-400 mt-1">
          Understand what this AI interview platform is built for
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-3xl p-8 space-y-10">
        
        <Section
          icon={<Sparkles size={20} />}
          title="Purpose"
          text="This platform is designed to help candidates prepare for real-world interviews using AI-driven, adaptive questioning. Each interview session is personalized based on your resume and evaluated fairly to highlight strengths and areas of improvement."
        />

        <Section
          icon={<Brain size={20} />}
          title="How It Works"
          text="After uploading your resume, our AI analyzes your profile and generates interview questions tailored to your experience level. Your answers are evaluated after each question, followed by a detailed summary at the end."
        />

        <Section
          icon={<ShieldCheck size={20} />}
          title="Privacy & Security"
          text="Your data is used only for interview analysis during your session. No resumes or interview answers are shared with third parties. Authentication and session security are handled using secure backend mechanisms."
        />
      </div>
    </div>
  );
}

/* ---------------- Reusable Section ---------------- */

function Section({ icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400 shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
