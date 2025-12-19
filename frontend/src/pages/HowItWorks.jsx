import BorderContainer from "../components/BorderContainer";
import {
  LogIn,
  Upload,
  Brain,
  MessageSquare,
  BarChart3,
  CheckCircle,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <LogIn size={28} />,
      title: "Sign Up or Login",
      desc: "Create your account and securely log in to start your interview journey.",
    },
    {
      icon: <Upload size={28} />,
      title: "Upload Your Resume",
      desc: "Upload your resume so the AI can understand your skills and experience.",
    },
    {
      icon: <Brain size={28} />,
      title: "AI Resume Analysis",
      desc: "Our AI extracts key details to personalize your interview questions.",
    },
    {
      icon: <MessageSquare size={28} />,
      title: "AI Interview",
      desc: "Answer 5 AI-generated interview questions tailored just for you.",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Answer Evaluation",
      desc: "Each answer is evaluated with scores, strengths, and improvements.",
    },
    {
      icon: <CheckCircle size={28} />,
      title: "Final Summary",
      desc: "Get a detailed interview summary and performance recommendation.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <BorderContainer>
        <h2 className="text-3xl font-bold text-white mb-2">
          How It Works
        </h2>
        <p className="text-slate-400 mb-8">
          A simple 6-step process to prepare you for real interviews
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-xl bg-slate-800/60 border border-slate-700"
            >
              <div className="text-cyan-400">{step.icon}</div>
              <div>
                <h4 className="text-white font-semibold mb-1">
                  {step.title}
                </h4>
                <p className="text-slate-400 text-sm">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </BorderContainer>
    </div>
  );
}
