/**
 * TodoList.jsx
 *
 * Demonstrates rendering lists from an array of objects with stable keys.
 *
 * Core Concepts:
 *  - Array.map() to transform data → JSX elements
 *  - `key` prop — WHY it matters:
 *      • React uses keys to identify which items changed, were added, or removed.
 *      • Using array INDEX as key breaks when items are prepended/reordered:
 *        React thinks item[0] changed, item[1] changed, etc. — wrong identity.
 *      • Using a stable unique `id` (e.g. from a DB or uuid) tells React
 *        exactly which element is which, regardless of position in the array.
 *  - useRef for a mutable counter that doesn't cause re-renders (unlike useState)
 *  - Functional state updater `prev => [newItem, ...prev]` for immutable prepend
 *
 * Best Practices:
 *  - Never mutate state directly (e.g. todos.push()) — always return new arrays
 *  - Keys must be unique among siblings, not globally unique
 *  - Accessible list: <ul> + <li> with semantic roles
 *  - Dark mode via Tailwind dark: variants
 */

import React, { useState, useRef } from "react";

// ── Initial seed data ─────────────────────────────────
// Each todo has a stable numeric `id` — this is the correct key
const INITIAL_TODOS = [
    { id: 3, task: "Learn React state management" },
    { id: 2, task: "Build reusable components" },
    { id: 1, task: "Master Tailwind CSS" },
];

const TodoList = () => {
    const [todos, setTodos] = useState(INITIAL_TODOS);
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    /**
     * useRef gives us a mutable value that persists across renders
     * without triggering a re-render when changed — perfect for counters/IDs.
     */
    const nextId = useRef(INITIAL_TODOS.length + 1);

    /**
     * Prepend a new todo to the START of the array.
     * With index keys this would confuse React — with id keys it works perfectly.
     *
     * Immutable pattern: spread into a NEW array, never mutate `todos` directly.
     */
    const addToStart = () => {
        if (!input.trim()) return;

        nextId.current += 1;
        const newTodo = {
            id: nextId.current,
            task: input.trim(),
        };
        // Functional updater — safe when multiple state updates batch
        setTodos((prev) => [newTodo, ...prev]);
        setInput("");
        setIsOpen(false);
    };

    /** Remove a todo by filtering out the matching id */
    const removeTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return (
        <div className="w-full max-w-md flex flex-col gap-4">
            {/* ── Controls ── */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {todos.length} todo{todos.length !== 1 ? "s" : ""}
                </span>
                <button
                    onClick={() => setIsOpen(true)}
                    className="
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
            bg-blue-50 dark:bg-blue-900/30
            text-blue-600 dark:text-blue-400
            hover:bg-blue-100 dark:hover:bg-blue-900/50
            transition-colors duration-150
            border border-blue-100 dark:border-blue-800
          "
                >
                    + Add todo
                </button>
            </div>
            {isOpen && (
                <div
                    className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50 backdrop-blur-sm
        "
                >
                    <div
                        className="
                bg-white dark:bg-gray-800
                rounded-xl shadow-lg
                w-full max-w-md p-6
                animate-fadeIn
            "
                    >
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                            Add New Todo
                        </h3>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addToStart()}
                            placeholder="Enter your todo..."
                            className="
                    w-full px-4 py-2 rounded-lg text-sm mb-4
                    bg-gray-50 dark:bg-gray-900
                    border border-gray-200 dark:border-gray-700
                    text-gray-700 dark:text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                            autoFocus
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="
                        px-4 py-2 rounded-lg text-sm
                        bg-gray-200 dark:bg-gray-700
                        text-gray-700 dark:text-gray-200
                    "
                            >
                                Cancel
                            </button>

                            <button
                                onClick={addToStart}
                                className="
                        px-4 py-2 rounded-lg text-sm
                        bg-blue-600 text-white
                        hover:bg-blue-700
                    "
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── List ── */}
            <ul className="flex flex-col gap-2" role="list">
                {todos.map((todo) => (
                    /**
                     * CORRECT: Using `todo.id` as the key.
                     *    React tracks each item by its stable identity, not its position.
                     *    Prepending a new item only inserts — nothing else re-renders.
                     *
                     * WRONG would be: key={index}
                     *    After prepend, index 0 is the NEW item but React sees it as the
                     *    OLD item[0] — causing wrong reconciliation and potential bugs.
                     */
                    <li
                        key={todo.id}
                        className="
              flex items-center justify-between gap-3
              px-4 py-3 rounded-xl
              bg-white dark:bg-gray-800
              border border-gray-100 dark:border-gray-700
              shadow-sm
              group
              transition-all duration-150
              hover:border-gray-200 dark:hover:border-gray-600
            "
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            {/* ID badge */}
                            <span
                                className="
                  shrink-0 text-xs font-mono font-bold
                  px-2 py-0.5 rounded-md
                  bg-blue-50 dark:bg-blue-900/40
                  text-blue-600 dark:text-blue-400
                  border border-blue-100 dark:border-blue-800
                "
                            >
                                #{todo.id}
                            </span>
                            {/* Task text */}
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                                {todo.task}
                            </span>
                        </div>

                        {/* Remove button */}
                        <button
                            onClick={() => removeTodo(todo.id)}
                            aria-label={`Remove: ${todo.task}`}
                            className="
                shrink-0 text-gray-300 dark:text-gray-600
                hover:text-red-400 dark:hover:text-red-400
                transition-colors duration-150 text-lg leading-none
                opacity-0 group-hover:opacity-100
              "
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
