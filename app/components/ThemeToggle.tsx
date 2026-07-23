"use client";

import { useEffect } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  useEffect(() => {
    const saved = window.localStorage.getItem("academic-site-theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initial = saved ?? preferred;
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggleTheme() {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("academic-site-theme", next);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      <span aria-hidden="true">◐</span>
    </button>
  );
}
