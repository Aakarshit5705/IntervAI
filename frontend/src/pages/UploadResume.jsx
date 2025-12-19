import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume, analyzeResume } from "../api/ai";
import BorderContainer from "../components/BorderContainer";
import SplitLayout from "../components/SplitLayout";
import { Upload, FileText, Loader2 } from "lucide-react";

export default function UploadResume() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setError("");

    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please upload a resume");

    try {
      setLoading(true);

      // STEP 1: Upload resume
      const formData = new FormData();
      formData.append("resume", file);
      const uploadRes = await uploadResume(formData);

      // STEP 2: Analyze resume
      const analyzeRes = await analyzeResume(
        uploadRes.data.resumeText
      );

      // STEP 3: Store profile
      sessionStorage.setItem(
        "candidateProfile",
        JSON.stringify(analyzeRes.data.profile)
      );

      // STEP 4: Start interview
      navigate("/interview/start");
    } catch (err) {
      setError(
        err.response?.data?.message || "Resume upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SplitLayout
      left={
        <BorderContainer>
          <h2 className="text-3xl font-bold text-white mb-2">
            Upload Your Resume
          </h2>
          <p className="text-slate-400 mb-6">
            We’ll analyze your resume to personalize your interview
          </p>

          {error && (
            <p className="text-red-400 mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-600 rounded-xl p-8 cursor-pointer hover:border-cyan-500 transition">
              <FileText size={36} className="text-slate-400 mb-3" />
              <span className="text-slate-300 text-sm">
                {file ? file.name : "Click to upload PDF resume"}
              </span>
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={handleFileChange}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload />
                  Upload Resume
                </>
              )}
            </button>
          </form>
        </BorderContainer>
      }
      right={
        <img
          src="/resume.png"
          alt="Resume"
          className="w-full h-full object-cover"
        />
      }
    />
  );
}
