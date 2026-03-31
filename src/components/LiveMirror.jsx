/**
 * LiveMirror.jsx
 *
 * Demonstrates a "controlled component" pattern in React.
 *
 * Key Concept — Controlled vs Uncontrolled:
 *  - Controlled: React state owns the value. The <input> always reflects state.
 *  - Uncontrolled: The DOM owns the value (via ref). Avoid for synced UI.
 *
 * Here, `text` state is the single source of truth. Every keystroke:
 *  1. Fires onChange
 *  2. Calls setText with the new value
 *  3. React re-renders — both input AND <p> update atomically
 *
 * Best Practices:
 *  - Controlled input (value + onChange always paired)
 *  - Conditional rendering for the placeholder hint
 *  - Accessible: <label> linked to input via htmlFor/id
 *  - Dark mode via Tailwind dark: variants
 */

import React, { useState } from "react";

const LiveMirror = () => {
    // `text` is the single source of truth for both the input and the mirror
    const [text, setText] = useState("");

    return (
        <div className="flex flex-col gap-4 w-full max-w-md">
            {/* ── Input ── */}
            <div className="flex flex-col gap-1">
                <label
                    htmlFor="mirror-input"
                    className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                    Type here
                </label>
                <input
                    id="mirror-input"
                    type="text"
                    value={text} // controlled: always reflects state
                    onChange={(e) => setText(e.target.value)} // state updates on every keystroke
                    placeholder="Start typing…"
                    className="
            w-full px-4 py-2.5 rounded-lg text-sm
            border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition duration-150
          "
                />
            </div>

            {/* ── Mirror ── */}
            <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Mirror
                </span>
                <p
                    className="
            min-h-10.5 px-4 py-2.5 rounded-lg text-sm
            bg-gray-50 dark:bg-gray-800/60
            border border-dashed border-gray-200 dark:border-gray-700
            text-gray-800 dark:text-gray-200
            transition-all duration-150
          "
                >
                    {/* Show placeholder hint when nothing has been typed yet */}
                    {text || (
                        <span className="text-gray-400 dark:text-gray-600 italic">
                            Your text appears here instantly…
                        </span>
                    )}
                </p>
            </div>

            {/* ── Character count (bonus derived value from state) ── */}
            <p className="text-right text-xs text-gray-400 dark:text-gray-600">
                {text.length} character{text.length !== 1 ? "s" : ""}
            </p>
        </div>
    );
};

export default LiveMirror;
