import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import AuthForms from "./components/jobSeeker/auth/AuthForms";
import SignUp from "./components/jobSeeker/auth/SignUp";
import Login from "./components/jobSeeker/auth/Login";
import Dashboard from "./components/jobSeeker/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Logout from "./components/jobSeeker/auth/Logout";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import ResetPassword from "./components/jobSeeker/auth/forgot-password/ResetPassword";
import SuccessScreen from "./components/jobSeeker/auth/forgot-password/SuccessScreen";
import ForgotPassword from "./components/jobSeeker/auth/forgot-password/ForgotPassword";
import EmailSent from "./components/jobSeeker/auth/forgot-password/EmailSent";
import ProtectedRoute from "./app-store/protectedRoutes";
import NotFound from "./NotFound";

toast.configure();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Sidebar>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/job-seeker" element={<AuthForms />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/email-sent" element={<EmailSent />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/auth/success" element={<SuccessScreen />} />
            <Route path="/auth/logout" element={<Logout />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/user/dashboard" element={<Dashboard />} />
              <Route path="/jobs" element={<Jobs />} />
            </Route>

            {/* Not Found Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Sidebar>

        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
