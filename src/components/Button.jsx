/**
 * Button.jsx
 *
 * A reusable Button component that accepts:
 *  - `label`  (string)  — the text displayed inside the button
 *  - `color`  (string)  — any valid CSS color used as the background
 *
 * Best Practices Used:
 *  - PropTypes-style JSDoc for documentation
 *  - Destructured props for clarity
 *  - Tailwind for base layout/shape; inline style only for the dynamic color
 *  - Dark-mode safe: text is always white on any colored background
 *  - Accessible: role="button" is implicit on <button>; focus ring via Tailwind
 */

import React from "react";

/**
 * @param {{ label: string, color: string }} props
 */
const Button = ({ label = "Click Me", color = "#185FA5" }) => {
    return (
        <button
            // Tailwind handles shape, spacing, font, transition & focus ring
            className="
        px-5 py-2
        rounded-lg
        text-white text-sm font-medium
        transition-opacity duration-200
        hover:opacity-80
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        dark:focus:ring-offset-gray-900
      "
            // Only the dynamic background comes from an inline style
            style={{ backgroundColor: color }}
        >
            {label}
        </button>
    );
};

export default Button;
