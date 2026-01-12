import React, { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import api from "../../helpers/api";
import assets from "../../assets/assets";

function ResetPassword() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim()
      .email("Please enter a valid email")
      .required("Please provide your email"),
    code: yup
      .string()
      .trim()
      .matches(/^\d{6}$/, "OTP must be 6 digits")
      .required("Please provide the 6-digit code"),
    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Please provide a new password"),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords do not match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await api.post("/auth/resetPassword", values);

        if (res.status === 200) {
          toast.success("Password reset successful");
          localStorage.removeItem("reset-email");
          navigate("/");
        }
      } catch (error) {
        const errMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to reset password";
        toast.error(errMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("reset-email");
    if (saved) formik.setFieldValue("email", saved);
  }, []);

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-gradient-to-b from-primary/10 via-white to-white px-4 py-10 font-sans text-slate-800">
      <div className="w-full max-w-[520px]">
        <div className="flex items-center lg:justify-center gap-0 mb-2 lg:mb-7">
          <div className="w-24 h-24">
            <img src={assets.DarkLogo} alt="Logo" className="w-full h-full" />
          </div>
          <span className="hidden -translate-x-4 lg:flex text-2xl font-bold text-blue-900 tracking-tight">
            FlowUnit
          </span>
        </div>

        <div className="bg-white rounded-[28px] shadow-xl shadow-slate-900/10 border border-slate-100 px-6 sm:px-10 py-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-tetiary hover:text-slate-800 transition"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="text-center space-y-2 mt-4">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Shield className="text-primary" size={22} />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              Reset password
            </h1>
            <p className="text-tetiary">
              Enter your email, the 6-digit code, and your new password.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="mt-10 space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-tetiary group-focus-within:text-primary transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-tetiary placeholder-slate-400"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-tetiary group-focus-within:text-primary transition-colors">
                <Shield size={20} />
              </div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="6-digit code"
                name="code"
                id="code"
                value={formik.values.code}
                onChange={(e) => {
                  const clean = e.target.value.replace(/\D/g, "").slice(0, 6);
                  formik.setFieldValue("code", clean);
                }}
                onBlur={formik.handleBlur}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-tetiary placeholder-slate-400"
              />
              {formik.touched.code && formik.errors.code && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {formik.errors.code}
                </p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-tetiary group-focus-within:text-primary transition-colors">
                <Lock size={20} />
              </div>
              <input
                type={showNew ? "text" : "password"}
                placeholder="New password"
                name="newPassword"
                id="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-tetiary placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {formik.errors.newPassword}
                </p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-tetiary group-focus-within:text-primary transition-colors">
                <Lock size={20} />
              </div>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-11 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-tetiary placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword && (
                  <p className="mt-1 text-xs text-red-600 font-medium">
                    {formik.errors.confirmNewPassword}
                  </p>
                )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-primary/90 hover:bg-primary cursor-pointer text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Resetting..." : "Reset password"}
            </button>

            <div className="text-center text-sm text-tetiary">
              Back to{" "}
              <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className="font-semibold text-primary/90 hover:text-primary hover:underline transition-all"
              >
                Log in
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Use the code sent to your email. If it expired, request a new one.
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
