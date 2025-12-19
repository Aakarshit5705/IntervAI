export default function BorderContainer({ children }) {
  return (
    <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-purple-500/40 shadow-[0_0_60px_-15px_rgba(56,189,248,0.3)]">
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl p-10">
        {children}
      </div>
    </div>
  );
}
