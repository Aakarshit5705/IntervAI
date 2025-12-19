import { HelpCircle, Upload, MessageSquare, Mail } from "lucide-react";

export default function HelpSupport() {
  return (
    <div className="max-w-4xl mx-auto text-white">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-slate-400 mt-1">
          Get help using the platform and understand common issues
        </p>
      </div>

      {/* Help Cards */}
      <div className="space-y-8">
        <HelpCard
          icon={<Upload size={20} />}
          title="Resume Upload Issues"
          text="Ensure your resume is in PDF format and contains readable text. Scanned images or very short resumes may fail analysis."
        />

        <HelpCard
          icon={<MessageSquare size={20} />}
          title="Interview Questions Not Loading"
          text="If the AI service is temporarily overloaded, retry after a short delay. Your interview session remains active."
        />

        <HelpCard
          icon={<HelpCircle size={20} />}
          title="General Assistance"
          text="This platform is continuously improving. If you experience unexpected behavior, refresh the page or log out and log back in."
        />
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-sm text-slate-400">
        
        <span><Mail/></span>
       In case of AI key error, reach out to us at:{" "}
    <a href="mailto:msd40551@gmail.com"className="text-white hover:underline">msd40551@gmail.com</a>
      </div>
    </div>
  );
}

/* ---------------- Reusable Card ---------------- */

function HelpCard({ icon, title, text }) {
  return (
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-2xl p-6 flex gap-4">
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
