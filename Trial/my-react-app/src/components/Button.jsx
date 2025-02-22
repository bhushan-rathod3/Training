import React, { useContext } from "react";
import { themeContext } from "../App";

function Button() {
  const [theme, setTheme] = useContext(themeContext);
  console.log("Button Component");
  return (
    <button
      onClick={() => {
        theme === "light" ? setTheme("dark") : setTheme("light");
      }}
    >
      {theme} mode
    </button>
  );
}

export default Button;
