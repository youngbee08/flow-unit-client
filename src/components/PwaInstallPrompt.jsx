import React, { useEffect, useState } from "react";
import { Download, Share2, X } from "lucide-react";

const PwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(ios);

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;
    setIsInStandaloneMode(Boolean(standalone));

    if (ios && !window.navigator.standalone) setShowInstall(true);

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismissPermanently = () => {
    setShowInstall(false);
    localStorage.setItem("pwaPromptDismissed", "true");
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    dismissPermanently();
  };

  const dismissed = localStorage.getItem("pwaPromptDismissed");
  if (dismissed || isInStandaloneMode || !showInstall) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[380px] z-50"
      role="status"
      aria-live="polite"
    >
      <div className="relative w-full rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 px-4 py-4 text-slate-800">
        <button
          type="button"
          onClick={dismissPermanently}
          className="absolute top-3 right-3 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Dismiss install prompt"
          title="Dismiss"
        >
          <X size={18} />
        </button>

        <div className="flex gap-3 pr-10">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            {isIos ? (
              <Share2 className="text-primary" size={18} />
            ) : (
              <Download className="text-primary" size={18} />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              Install FlowUnit
            </p>
            <p className="mt-0.5 text-xs text-tetiary leading-relaxed">
              {isIos
                ? "On iPhone/iPad: tap Share → Add to Home Screen."
                : "Get quicker access by installing the app."}
            </p>

            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              {!isIos && (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="inline-flex items-center justify-center w-full sm:w-auto bg-primary/90 hover:bg-primary text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-200 text-sm"
                >
                  Install
                </button>
              )}
              <button
                type="button"
                onClick={dismissPermanently}
                className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2.5 rounded-xl font-semibold border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-all text-sm"
              >
                {isIos ? "Got it" : "Not now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;
