import { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import BorderContainer from "../components/BorderContainer";
import SplitLayout from "../components/SplitLayout";
import { Mail, Lock, User } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
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
      await signup(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <SplitLayout
      left={
        <BorderContainer>
          {/* Heading */}
          <h2 className="text-3xl font-bold text-white mb-2">
            Create Account
          </h2>
          <p className="text-slate-400 mb-6">
            Start your AI interview journey
          </p>

          {error && (
            <p className="text-red-400 text-sm mb-3">{error}</p>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              icon={User}
              name="name"
              placeholder="Username"
              onChange={handleChange}
            />

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
              Create Account
            </button>
          </form>

          {/* Footer */}
          <p className="text-slate-400 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 hover:underline">
              Login
            </Link>
          </p>
        </BorderContainer>
      }
      right={
        <img
          src="/image.png"
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
