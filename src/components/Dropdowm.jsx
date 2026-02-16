import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Dropdown = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-[180px]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full flex items-center justify-between
          px-4 py-2 rounded-xl border border-slate-200
          bg-white text-primary text-sm
          hover:border-primary transition-colors cursor-pointer
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
          absolute mt-2 w-full bg-white rounded-xl shadow-lg
          border border-slate-200 z-50 overflow-hidden
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
                w-full text-left px-4 py-2 text-sm
                hover:bg-primary/10 text-primary
                transition-colors cursor-pointer
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

export default Dropdown;
