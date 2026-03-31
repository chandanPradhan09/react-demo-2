/**
 * HoverBox.jsx
 *
 * A div that changes background color based on mouse interaction.
 *
 * Events Demonstrated:
 *  - onMouseEnter — fires when the pointer moves INTO the element
 *  - onMouseLeave — fires when the pointer moves OUT OF the element
 *
 * Key Design Decision:
 *  State holds the color string. React re-renders the div with the new color
 *  on each event. We use Tailwind classes dynamically by toggling between
 *  two full class strings (safer than string interpolation which can confuse
 *  Tailwind's JIT purge in production builds).
 *
 * Best Practices:
 *  - No setTimeout / manual DOM manipulation — React state handles the UI
 *  - Smooth CSS transition via Tailwind `transition-colors duration-300`
 *  - ARIA label describes the interactive behaviour to assistive tech
 *  - Dark mode compatible via Tailwind dark: variants
 */

import React, { useState } from "react";

// Colour tokens — defined once, easy to change
const COLORS = {
    default: "bg-blue-600 dark:bg-blue-700",
    hover: "bg-red-500  dark:bg-red-600",
};

const HoverBox = () => {
    // `isHovered` drives which colour class is applied
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            // Swap the colour class based on hover state
            className={`
        w-full max-w-sm px-8 py-10 rounded-2xl
        flex flex-col items-center justify-center gap-2
        cursor-default select-none
        transition-colors duration-300 ease-in-out
        ${isHovered ? COLORS.hover : COLORS.default}
      `}
            onMouseEnter={() => setIsHovered(true)} // → red
            onMouseLeave={() => setIsHovered(false)} // → blue
            aria-label="Hover to change background color"
        >
            {/* Status dot */}
            <div
                className={`
          w-3 h-3 rounded-full transition-colors duration-300
          ${isHovered ? "bg-red-200" : "bg-blue-200"}
        `}
            />

            {/* Label */}
            <p className="text-white text-sm font-medium tracking-wide">
                {isHovered ? "Mouse is inside — Red!" : "Hover over me — Blue"}
            </p>

            {/* Hint */}
            <p className="text-white/60 text-xs">
                onMouse{isHovered ? "Leave" : "Enter"} fires next
            </p>
        </div>
    );
};

export default HoverBox;
