"use client";

import { useState } from "react";

export default function FilterChips({ filters, defaultKey = "all", onChange }) {
  const [active, setActive] = useState(defaultKey);

  function select(key) {
    setActive(key);
    onChange?.(key);
  }

  return (
    <div className="flex flex-wrap justify-center gap-3" role="group" aria-label="Filter">
      {filters.map((f) => {
        const isActive = active === f.key;
        return (
          <button
            key={f.key}
            type="button"
            aria-pressed={isActive}
            onClick={() => select(f.key)}
            className={`rounded-full px-5 py-2.5 text-sm transition ${
              isActive
                ? "border-0 bg-foreground font-bold text-white"
                : "border border-foreground/12 bg-white font-semibold text-foreground hover:border-foreground/30"
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
