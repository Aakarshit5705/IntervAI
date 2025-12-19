import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import BorderContainer from "../components/BorderContainer";
import SplitLayout from "../components/SplitLayout";
import { Send, Loader2 } from "lucide-react";

const MAX_QUESTIONS = 5;

export default function Interview() {
  const navigate = useNavigate();

  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Start interview on mount
  useEffect(() => {
    const startInterview = async () => {
      try {
        const profileRaw = sessionStorage.getItem("candidateProfile");

        if (!profileRaw) {
          navigate("/upload");
          return;
        }

        const profile = JSON.parse(profileRaw);

        const res = await api.post("/ai/start-interview", { profile });

        setSessionId(res.data.sessionId);

        const first = await api.post("/ai/next-question", {
          sessionId: res.data.sessionId,
        });

        setQuestion(first.data.question);
      } catch (err) {
        console.error(err);
        setError("Failed to start interview");
      }
    };

    startInterview();
  }, [navigate]);

  // 🔹 Submit answer
  const submitAnswer = async () => {
    if (!answer.trim()) return;

    try {
      setLoading(true);
      setError("");

      const evalRes = await api.post("/ai/evaluate-answer", {
        sessionId,
        question,
        answer,
      });

      setEvaluation(evalRes.data);

      const nextCount = count + 1;
      setCount(nextCount);

      // 🔚 After 5 questions → summary
      if (nextCount >= MAX_QUESTIONS) {
        navigate("/interview/summary", {
          state: { sessionId },
        });
        return;
      }

      // ⏭ Next question
      const next = await api.post("/ai/next-question", { sessionId });

      setQuestion(next.data.question);
      setAnswer("");
      setEvaluation(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "The AI interviewer is temporarily overloaded. Please try again shortly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SplitLayout
      left={
        <BorderContainer>
          <h2 className="text-2xl font-bold text-white mb-2">
            Question {count + 1} / {MAX_QUESTIONS}
          </h2>

          {question && (
            <p className="text-slate-300 mb-4">{question}</p>
          )}

          {error && (
            <p className="text-red-400 text-sm mb-3">{error}</p>
          )}

          {/* Answer Box */}
          <textarea
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="w-full p-4 rounded-xl bg-slate-800/70 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {/* Evaluation */}
          {evaluation && (
            <div className="mt-4 p-4 rounded-xl bg-slate-900/80 overflow-y-auto max-h-[320px]">
              <p className="text-cyan-400 font-semibold">
                Score: {evaluation.score}/10
              </p>

              <div className="mt-2">
                <p className="text-slate-300 font-medium">Strengths</p>
                <ul className="list-disc ml-5 text-slate-400">
                  {evaluation.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2">
                <p className="text-slate-300 font-medium">Improvements</p>
                <ul className="list-disc ml-5 text-slate-400">
                  {evaluation.improvements.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-2 text-slate-300 italic">
                Verdict: {evaluation.verdict}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={submitAnswer}
            disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Evaluating...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Answer
              </>
            )}
          </button>
        </BorderContainer>
      }
      right={
        <div className="w-full h-full flex items-center justify-center text-slate-500">
          AI Interview in progress
        </div>
      }
    />
  );
}
