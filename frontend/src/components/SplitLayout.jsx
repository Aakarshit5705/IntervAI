export default function SplitLayout({ left, right }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 flex items-center justify-center">
      <div className="w-full max-w-7xl h-[650px] grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        
        {/* LEFT */}
        <div className="flex items-center justify-center bg-slate-900/60 backdrop-blur-xl">
          {left}
        </div>

        {/* RIGHT */}
        <div className="hidden md:block relative backdrop-blur-xl">
          {right}
        </div>

      </div>
    </div>
  );
}
