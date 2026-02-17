import { useEffect, useState } from "react";

function AuthCarousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="hidden lg:flex w-1/2 h-dvh bg-primary relative overflow-hidden flex-col justify-center items-center text-white p-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-primary/30 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="relative w-full overflow-hidden">
          <div
            className="flex w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="w-full min-w-full max-w-full flex-shrink-0 flex flex-col items-center"
              >
                <div className="w-full aspect-[4/3] max-h-[420px] relative mb-8">
                  <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-64 h-48 bg-white rounded-xl shadow-2xl shadow-blue-900/50 p-4 flex flex-col gap-3 transition-transform duration-700 hover:scale-105">
                    <div className="flex gap-1.5 mb-1">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>

                    <div className="flex items-start gap-3 p-2 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="w-3/4 h-2 bg-slate-200 rounded" />
                        <div className="w-1/2 h-2 bg-slate-200 rounded" />
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 bg-slate-50 rounded-xl opacity-70">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="w-2/3 h-2 bg-slate-200 rounded" />
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 bg-slate-50 rounded-xl opacity-40">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="w-3/4 h-2 bg-slate-200 rounded" />
                      </div>
                    </div>
                  </div>
                  <svg
                    className="absolute top-1/2 left-[30%] -translate-y-1/2 h-48 w-32 overflow-visible stroke-blue-300/40"
                    strokeWidth="2"
                    fill="none"
                  >
                    <path d="M0,20 C40,20 60,96 100,96" />
                    <path d="M0,96 C40,96 60,96 100,96" />
                    <path d="M0,172 C40,172 60,96 100,96" />
                  </svg>
                  <div className="absolute top-1/2 left-[25%] -translate-y-1/2 flex flex-col gap-8 -translate-x-full">
                    {slide.connectedIcons.map((Icon, idx) => (
                      <div
                        key={idx}
                        className={`w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg shadow-blue-900/20 transition-transform duration-500 hover:scale-110 ${
                          idx !== 1 ? "-translate-x-2" : ""
                        }`}
                      >
                        <Icon
                          size={24}
                          className={
                            idx === 0
                              ? "text-purple-500"
                              : idx === 1
                                ? "text-blue-500"
                                : "text-green-500"
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <h2 className="text-3xl font-bold leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-blue-100 text-lg max-w-sm mx-auto leading-relaxed">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === index
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthCarousel;
