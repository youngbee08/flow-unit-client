import React, { useEffect, useMemo, useRef, useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import api from "../../helpers/api";
import assets from "../../assets/assets";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;
const formatTime = (s) => `0:${String(s).padStart(2, "0")}`;

function VerifyEmail() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const inputsRef = useRef([]);

  const code = useMemo(() => otp.join(""), [otp]);
  const isComplete = otp.every((d) => d !== "");

  const focusIndex = (i) => {
    const el = inputsRef.current[i];
    if (el) el.focus();
  };

  const handleChange = (i, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const next = [...otp];
    next[i] = digit;
    setOtp(next);

    if (digit && i < OTP_LENGTH - 1) focusIndex(i + 1);
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace") {
      if (otp[i]) {
        const next = [...otp];
        next[i] = "";
        setOtp(next);
      } else if (i > 0) {
        focusIndex(i - 1);
        const next = [...otp];
        next[i - 1] = "";
        setOtp(next);
      }
    }

    if (e.key === "ArrowLeft" && i > 0) focusIndex(i - 1);
    if (e.key === "ArrowRight" && i < OTP_LENGTH - 1) focusIndex(i + 1);
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;

    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((d, idx) => (next[idx] = d));
    setOtp(next);

    const last = Math.min(pasted.length, OTP_LENGTH) - 1;
    focusIndex(Math.max(last, 0));
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isComplete) return toast.error("Enter the 6-digit code");
    setIsSubmitting(true);
    try {
      const currentUser = localStorage.getItem("current-auth");

      const res = await api.post("/auth/verify", {
        email: currentUser,
        code: code,
      });

      if (res.status === 200 || res.status === 202) {
        toast.success("Verified successfully");
        navigate("/");
        localStorage.removeItem("current-auth");
      }
    } catch (error) {
      const errMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Verification failed";
      toast.error(errMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const currentUser = localStorage.getItem("current-auth");
      const res = await api.post("/auth/resendOtp", { email: currentUser });
      if (res.status === 200) {
        toast.success("OTP resent successfully");
        setSecondsLeft(RESEND_SECONDS);
      }
    } catch (error) {
      const errMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to resend OTP";
      toast.error(errMessage);
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const t = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [secondsLeft]);

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

            <h1 className="text-2xl sm:text-4xl font-bold text-primary">
              Verify your email
            </h1>
            <p className="text-tetiary">
              Enter the 6-digit code we sent to your email.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div
              className="flex items-center justify-center gap-2 sm:gap-3"
              onPaste={handlePaste}
            >
              {otp.map((val, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={val}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  className="w-11 h-12 sm:w-12 sm:h-14 text-center text-lg font-semibold rounded-xl border border-slate-200 bg-white
                             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!isComplete || isSubmitting}
              className="w-full bg-primary/90 hover:bg-primary cursor-pointer text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/20
                         active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </button>

            <div className="text-center text-sm text-tetiary">
              Didn’t receive a code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || secondsLeft > 0}
                className="font-semibold text-primary/90 hover:text-primary hover:underline transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isResending
                  ? "Resending..."
                  : secondsLeft > 0
                  ? `Resend in ${formatTime(secondsLeft)}`
                  : "Resend"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Tip: You can paste the full code — it will auto-fill.
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;
