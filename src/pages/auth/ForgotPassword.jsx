import React from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import api from "../../helpers/api";
import assets from "../../assets/assets";

function ForgotPassword() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim()
      .email("Please enter a valid email")
      .required("Please provide your email"),
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await api.post("/auth/requestResetPassword", values);

        if (res.status === 200) {
          toast.success("Reset code sent. Check your email ");
          localStorage.setItem("reset-email", values.email);
          navigate("/reset-password");
        }
      } catch (error) {
        const errMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to send reset mail";
        toast.error(errMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

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
              <Mail className="text-primary" size={22} />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              Reset your password
            </h1>
            <p className="text-tetiary">
              Enter your email and we’ll send you a reset code.
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="mt-10 space-y-6">
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

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-primary/90 hover:bg-primary cursor-pointer text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? "Sending..." : "Send reset email"}
            </button>

            <div className="text-center text-sm text-tetiary">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="font-semibold text-primary/90 hover:text-primary hover:underline transition-all"
              >
                Log in
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          If you don’t see the email, check your spam/junk folder.
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
