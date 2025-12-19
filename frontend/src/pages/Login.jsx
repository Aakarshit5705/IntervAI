import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import BorderContainer from "../components/BorderContainer";
import SplitLayout from "../components/SplitLayout";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginApi(form);
      login({ user: res.data });
      navigate("/");
    } catch (err) {
      console.log("Error in login: ",err)
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <SplitLayout
      left={
        <BorderContainer>
          {/* Heading */}
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back
          </h2>
          <p className="text-slate-400 mb-6">
            Login to continue your AI interview journey
          </p>

          {error && (
            <p className="text-red-400 text-sm mb-3">{error}</p>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              icon={Mail}
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleChange}
            />

            <Input
              icon={Lock}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition font-semibold text-white text-lg"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-slate-400 text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-cyan-400 hover:underline">
              Sign up
            </Link>
          </p>
        </BorderContainer>
      }
      right={
        <img
          src="/login-illustration.png"
          alt="AI Interview Illustration"
          className="w-full h-full object-cover"
        />
      }
    />
  );
}

function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={20}
      />
      <input
        {...props}
        className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800/70 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition"
      />
    </div>
  );
}
