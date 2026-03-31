/**
 * TrafficLight.jsx
 *
 * A TrafficLight component that maps a `color` prop to a status message.
 *
 * Concepts Demonstrated:
 *  - Props as configuration (colour-driven behaviour)
 *  - switch statement for multi-branch prop logic
 *  - Derived values computed BEFORE the return (clean JSX)
 *  - Component composition: TrafficLight used inside TrafficLightDemo
 *
 * Best Practices:
 *  - switch has a `default` case — always handle unknown prop values
 *  - Config object pattern (`LIGHT_CONFIG`) keeps data separate from markup
 *  - PropTypes JSDoc for self-documenting props
 *  - Accessible: role="status" on the message so screen readers announce it
 *  - Dark mode compatible via Tailwind dark: variants
 */

import React, { useState } from "react";

// ── Config ──────────────────────────────────────────────
// Centralising light data makes adding new colours trivial
const LIGHT_CONFIG = {
    red: { message: "Stop", ring: "bg-red-500", glow: "shadow-red-500/60" },
    yellow: {
        message: "Slow Down",
        ring: "bg-yellow-400",
        glow: "shadow-yellow-400/60",
    },
    green: {
        message: "Go",
        ring: "bg-emerald-500",
        glow: "shadow-emerald-500/60",
    },
};

// ── TrafficLight (pure display component) ───────────────
/**
 * @param {{ color: "red" | "yellow" | "green" }} props
 */
const TrafficLight = ({ color }) => {
    // Switch maps the prop to display data — logic stays out of JSX
    let config;
    switch (color) {
        case "red":
            config = LIGHT_CONFIG.red;
            break;
        case "yellow":
            config = LIGHT_CONFIG.yellow;
            break;
        case "green":
            config = LIGHT_CONFIG.green;
            break;
        default:
            // Always handle unknown values gracefully
            config = {
                message: "Unknown signal",
                ring: "bg-gray-400",
                glow: "",
            };
    }

    return (
        <div className="flex items-center gap-3">
            {/* Coloured bulb */}
            <div
                className={`
          w-8 h-8 rounded-full shadow-lg
          ${config.ring} ${config.glow}
          ring-2 ring-white/20
        `}
            />
            {/* Derived message — changes with the prop */}
            <span
                role="status"
                className="text-sm font-semibold text-gray-800 dark:text-gray-100"
            >
                {config.message}
            </span>
        </div>
    );
};

// ── TrafficLightDemo (stateful wrapper) ─────────────────
// Lets you interact with TrafficLight without lifting state
export const TrafficLightDemo = () => {
    const [activeColor, setActiveColor] = useState("red");
    const lights = ["red", "yellow", "green"];

    return (
        <div className="flex gap-8 items-start">
            {/* ── Housing ── */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-gray-800 dark:bg-gray-900 shadow-xl">
                {lights.map((c) => {
                    const cfg = LIGHT_CONFIG[c];
                    const isActive = activeColor === c;
                    return (
                        <button
                            key={c}
                            onClick={() => setActiveColor(c)}
                            aria-label={`Set light to ${c}`}
                            className={`
                w-12 h-12 rounded-full border-2 transition-all duration-300 cursor-pointer
                ${
                    isActive
                        ? `${cfg.ring} border-white/30 shadow-lg ${cfg.glow}`
                        : "bg-gray-600 dark:bg-gray-700 border-transparent opacity-40"
                }
              `}
                        />
                    );
                })}
            </div>

            {/* ── Active message ── */}
            <div className="flex flex-col justify-center gap-2 mt-2">
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    Signal
                </p>
                <TrafficLight color={activeColor} />
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    color prop:{" "}
                    <code className="font-mono text-blue-500">
                        "{activeColor}"
                    </code>
                </p>
            </div>
        </div>
    );
};

export default TrafficLight;
