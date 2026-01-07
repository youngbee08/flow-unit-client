import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FormDropdown = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full flex items-center justify-between
          px-3 py-3 rounded-xl border border-primary
          text-tetiary text-sm placeholder-slate-400
          focus:ring-primary focus:ring-2 focus:outline-none focus:border-primary
          transition-all cursor-pointer
        "
      >
        <span>{value}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="
          absolute mt-2 w-full rounded-xl shadow-lg
          border border-primary z-50 overflow-hidden bg-white
        "
        >
          {options.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="
                w-full text-left px-3 py-3 text-tetiary text-sm
                hover:bg-primary/10 transition-colors cursor-pointer
              "
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormDropdown;
