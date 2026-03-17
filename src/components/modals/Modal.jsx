import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({
  children,
  onClose,
  showClose = true,
  customMode = false,
}) => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    console.error('The "modal-root" element was not found in the DOM.');
    return null;
  }

  useEffect(() => {
    if (!onClose) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      {customMode ? (
        children
      ) : (
        <div
          className="
            bg-white
            md:p-8 p-5
            w-full max-w-2xl
            rounded-2xl relative
            max-h-[85vh] overflow-y-auto
            shadow-2xl ring-1 ring-black/5
          "
          onMouseDown={(event) => event.stopPropagation()}
        >
          {showClose && (
            <button
              onClick={onClose}
              type="button"
              className="
                absolute md:top-6 md:right-6 top-4 right-4
                text-[#122239]
                hover:text-[#757E8D]
                transition-colors cursor-pointer
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {children}
        </div>
      )}
    </div>,
    modalRoot
  );
};

export default Modal;
