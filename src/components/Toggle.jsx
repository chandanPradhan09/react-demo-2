/**
 * Toggle.jsx
 *
 * A controlled Toggle component that switches between "ON" and "OFF".
 *
 * Concepts Demonstrated:
 *  - useState for local boolean state
 *  - Functional updater `prev => !prev` (safe for batched updates)
 *  - Derived UI values (color, position) computed from state — no extra state
 *  - Accessible toggle: uses role="switch" + aria-checked for screen readers
 *  - Dark mode: all colors use Tailwind dark: variants
 */

import React, { useState } from "react";

const Toggle = () => {
    // Single boolean drives the entire component's visual output
    const [isOn, setIsOn] = useState(false);

    /**
     * Flip the toggle.
     * We use the functional form `prev => !prev` to guarantee we're always
     * working from the latest state — safe even if React batches updates.
     */
    const handleToggle = () => setIsOn((prev) => !prev);

    return (
        <div className="flex items-center gap-4">
            {/* ── Pill track ── */}
            <button
                role="switch"
                aria-checked={isOn}
                onClick={handleToggle}
                className={`
          relative w-14 h-7 rounded-full
          transition-colors duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-emerald-500 dark:focus:ring-offset-gray-900
          ${
              isOn
                  ? "bg-emerald-500 dark:bg-emerald-600"
                  : "bg-gray-300 dark:bg-gray-600"
          }
        `}
            >
                {/* ── Sliding thumb ── */}
                <span
                    className={`
            absolute top-1 left-1
            w-5 h-5 rounded-full bg-white shadow
            transition-transform duration-300 ease-in-out
            ${isOn ? "translate-x-7" : "translate-x-0"}
          `}
                />
            </button>

            {/* ── Label ── */}
            <span
                className={`
          text-sm font-semibold tracking-widest select-none
          transition-colors duration-200
          ${
              isOn
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-gray-400 dark:text-gray-500"
          }
        `}
            >
                {isOn ? "ON" : "OFF"}
            </span>
        </div>
    );
};

export default Toggle;
