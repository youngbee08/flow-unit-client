import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Info, Loader2 } from "lucide-react";

const NEW_APP_URL = "https://app.flowunit.co";
const LOTTIE_PLAYER_SRC =
  "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";

const RedirectNotice = () => {
  const playerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    setReducedMotion(Boolean(prefersReducedMotion));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const existingScript = document.querySelector(
      'script[data-flowunit-lottie-player="true"]',
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = LOTTIE_PLAYER_SRC;
      script.async = true;
      script.defer = true;
      script.dataset.flowunitLottiePlayer = "true";
      script.onload = () => setScriptReady(true);
      script.onerror = () => setScriptReady(false);
      document.head.appendChild(script);
    } else {
      setScriptReady(true);
    }
  }, []);

  const handleOpenNewApp = () => {
    window.open(NEW_APP_URL, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(NEW_APP_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      window.prompt("Copy this link:", NEW_APP_URL);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden font-sans text-slate-800">
      {!reducedMotion && scriptReady && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <lottie-player
            ref={playerRef}
            src="/gone.json"
            background="transparent"
            speed="1"
            preserveAspectRatio="xMidYMid slice"
            autoplay
            loop
            style={{
              width: "100%",
              height: "100%",
              filter: "blur(12px) brightness(0.8)",
              transform: "scale(1.1)",
            }}
          />
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8">
        <div className="mt-6 gap-8 items-center">
          <div className="text-center">
            <h1 className="mt-3 text-3xl font-bold text-primary leading-snug">
              Continue on the new FlowUnit app
            </h1>

            <p className="mt-2 text-white text-sm sm:text-base text-center leading-relaxed">
              Access the updated platform at{" "}
              <a
                href={NEW_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary/90 hover:text-primary hover:underline transition-all"
              >
                app.flowunit.co
              </a>{" "}
              to continue seamlessly.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleOpenNewApp}
                className="w-full sm:w-auto bg-primary/90 hover:bg-primary text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition duration-200 flex items-center gap-2 text-sm justify-center"
              >
                Open app <ArrowUpRight size={16} />
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 transition gap-2 text-sm"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
                {copied ? "Copied" : "Copy link"}
              </button>
            </div>

            <p className="mt-4 text-xs text-white">
              If you encounter issues on the old app, refresh or clear your
              cache.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectNotice;
