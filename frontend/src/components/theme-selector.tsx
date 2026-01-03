import { PaletteIcon } from "lucide-react";
import { useEffect, useState } from "react";

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

const ThemeSelector = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "forest";
    }
    return "forest";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1">
        <PaletteIcon className="size-4" />
        <span className="hidden sm:inline">Theme</span>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-50 w-56 p-2 shadow-xl max-h-96 overflow-y-auto flex-nowrap"
      >
        {THEMES.map((th) => (
          <li key={th}>
            <button
              onClick={() => setTheme(th)}
              className={`flex justify-between ${
                theme === th ? "bg-primary text-primary-content" : ""
              }`}
            >
              <span className="capitalize">{th}</span>
              <div className="flex gap-0.5" data-theme={th}>
                <span className="w-2 h-4 rounded-sm bg-primary" />
                <span className="w-2 h-4 rounded-sm bg-secondary" />
                <span className="w-2 h-4 rounded-sm bg-accent" />
                <span className="w-2 h-4 rounded-sm bg-neutral" />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ThemeSelector;
