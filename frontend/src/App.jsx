import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import Interview from "./pages/Interview";
import InterviewSummary from "./pages/InterviewSummary";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import AboutPlatform from "./pages/AboutPlatform";
import HelpSupport from "./pages/HelpSupport";
import HowItWorks from "./pages/HowItWorks";

export default function App() {
  return (
    <>
      <Routes>

        {/* Public Routes (NO sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (WITH sidebar) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadResume />} />
            <Route path="/interview/start" element={<Interview />} />
            <Route path="/interview/summary" element={<InterviewSummary />} />
            <Route path="/howitworks" element={<HowItWorks />} />
            <Route path="/about" element={<AboutPlatform/>} />
            <Route path="/help" element={<HelpSupport />} />
          </Route>
        </Route>

      </Routes>
    </>
  );
}
