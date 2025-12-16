import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Check,
  LayoutDashboard,
  MessageSquare,
  Instagram,
  Chrome,
  Slack,
  Zap,
  BarChart3,
  User,
} from "lucide-react";
import AuthCarousel from "../../components/carousels/AuthCarousel";
import assets from "../../assets/assets";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../../helpers/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const slides = [
    {
      id: 1,
      title: "Organize projects in one place.",
      subtitle:
        "Plan, track, and manage tasks across teams from a single workspace.",
      MainIcon: LayoutDashboard,
      connectedIcons: [Slack, Chrome, Instagram],
    },
    {
      id: 2,
      title: "Track progress in real time.",
      subtitle:
        "Stay updated with task status, deadlines, and team performance at a glance.",
      MainIcon: BarChart3,
      connectedIcons: [Zap, Chrome, Slack],
    },
    {
      id: 3,
      title: "Collaborate without friction.",
      subtitle:
        "Assign tasks, share updates, and keep conversations tied to the work.",
      MainIcon: MessageSquare,
      connectedIcons: [Slack, Instagram, Zap],
    },
  ];

  const validationSchema = yup.object({
    userName: yup.string().required("Please provide your username"),
    password: yup.string().required("Please provide your password"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await api.post("/auth/login", values);
        if (res.status === 200) {
          toast.success("Login successful");
          login(res.data.token);
          setTimeout(() => {
            const loading = toast.loading("Redirecting to dashboard...");
            setTimeout(() => {
              toast.dismiss(loading);
              navigate("/dashboard/overview");
            }, 2000);
          }, 1500);
        }
      } catch (error) {
        // console.log(error);
        const errMessage =
          error.response.data.message || error.message || "Failed to log in";
        toast.error(errMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-dvh w-full flex overflow-hidden bg-white font-sans text-slate-800">
      <div className="w-full lg:w-1/2 h-dvh flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-white animate-fade-in-up">
        <div className="w-full max-w-md">
          <div className="flex items-center -translate-x-6 justify-start gap-0">
            <div className="w-20 h-20">
              <img src={assets.DarkLogo} alt="Logo" className="w-full h-full" />
            </div>
            <span className="text-2xl font-bold text-blue-900 tracking-tight">
              FlowUnit
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-primary">
              Log in to your Account
            </h1>
            <p className="text-tetiary">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-6 mt-8">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-tetiary group-focus-within:text-primary transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  name="userName"
                  id="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-tetiary placeholder-slate-400"
                />
                {formik.touched.userName && formik.errors.userName && (
                  <span className="text-xs text-red-600 font-medium">
                    {formik.errors.userName}
                  </span>
                )}
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-tetiary group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formik.values.password}
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-tetiary placeholder-slate-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <span className="text-xs text-red-600 font-medium">
                    {formik.errors.password}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 border border-slate-300 rounded focus-within:ring-2 focus-within:ring-primary bg-white transition-all group-hover:border-primary/90">
                  <input
                    type="checkbox"
                    className="peer absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className="w-5 h-5 bg-primary rounded hidden peer-checked:flex items-center justify-center transition-all">
                    <Check size={14} className="text-white" />
                  </div>
                </div>
                <span className="text-sm text-tetiary group-hover:text-slate-800 transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-primary/90 hover:text-primary hover:underline transition-all"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary/90 hover:bg-primary cursor-pointer text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all duration-200"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="text-center mt-5 text-sm text-tetiary">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-semibold text-primary/90 hover:text-primary hover:underline transition-all"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
      <AuthCarousel slides={slides} />
    </div>
  );
}

export default Login;
