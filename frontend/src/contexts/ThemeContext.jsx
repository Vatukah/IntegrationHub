import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Apply and persist theme
  useEffect(() => {
    const root = document.documentElement; // <html>
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Optional: change body background directly
    if (theme === "dark") {
      document.body.style.backgroundColor = "#0f172a"; // slate-900
      document.body.style.color = "#f1f5f9";
    } else {
      document.body.style.backgroundColor = "#f9fafb"; // gray-50
      document.body.style.color = "#111827";
    }

    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
  if (!localStorage.getItem("theme")) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }
}, []);


  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
