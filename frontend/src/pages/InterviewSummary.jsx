import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSummary } from "../api/ai";
import BorderContainer from "../components/BorderContainer";
import { Loader2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22d3ee", "#1e293b"]; // cyan + dark slate

export default function InterviewSummary() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const sessionId = state?.sessionId;

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      navigate("/upload");
      return;
    }

    const fetchSummary = async () => {
      try {
        const res = await getSummary(sessionId);
        setSummary(res.data.summary);
      } catch {
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <Loader2 className="animate-spin mr-2" />
        Generating summary...
      </div>
    );
  }

  const score = summary.overall_score;
  const pieData = [
    { name: "Score", value: score },
    { name: "Remaining", value: 10 - score },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <BorderContainer className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          🎯 Interview Summary
        </h2>

        {/* PIE CHART */}
        <div className="h-64 mb-6">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <p className="text-center text-xl font-semibold text-cyan-400 mb-6">
          Overall Score: {score} / 10
        </p>

        <p className="text-slate-300 mb-2 text-center">
          Communication Level:{" "}
          <span className="text-white font-semibold">
            {summary.communication_level}
          </span>
        </p>

        {/* STRENGTHS & WEAKNESSES */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h4 className="text-white font-semibold mb-2">
              ✅ Strengths
            </h4>
            <ul className="text-slate-400 list-disc ml-5 text-sm space-y-1">
              {summary.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">
              ⚠️ Weaknesses
            </h4>
            <ul className="text-slate-400 list-disc ml-5 text-sm space-y-1">
              {summary.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-cyan-400 mt-6 text-center font-semibold">
          Recommendation: {summary.recommendation}
        </p>
      </BorderContainer>
    </div>
  );
}
