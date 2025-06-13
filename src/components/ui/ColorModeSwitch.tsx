import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ColorModeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load initial theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark =
      storedTheme === "dark" ||
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  // Handle toggle
  const handleToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-switch"
        checked={isDarkMode}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="theme-switch">Dark Mode</Label>
    </div>
  );
}
